import { createMiddleware, createServerOnlyFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import cookie from 'cookie'
import i18next, { type InitOptions } from 'i18next'
import Backend, { type FsBackendOptions } from 'i18next-fs-backend'
import { initReactI18next } from 'react-i18next'
import { LOCALES_PATH } from '~/config/paths'
import type { AppContext } from '~/src/types/app'
import addResponseCookie from '../addResponseCookie'
import { defaultOptions, getCookieOptions, LOOKUP_COOKIE } from './shared'

/** @server */
export const i18nextInit = createServerOnlyFn(async () => {
  if (i18next.isInitialized) return i18next

  const i18nextOptions = {
    ...defaultOptions,
    backend: {
      loadPath: `${LOCALES_PATH}/{{lng}}/{{ns}}.json`,
    } satisfies FsBackendOptions,
  } satisfies InitOptions

  await i18next.use(Backend).use(initReactI18next).init(i18nextOptions)
})

export const i18nextMiddleware = createMiddleware().server<AppContext>(
  async ({ next, request }) => {
    request.i18n = request.i18n || i18next.cloneInstance({ initAsync: false })

    const { i18n: requestI18n } = request

    const changeLanguage = async () => {
      const getLanguage = () => {
        const cookieHeader = getRequestHeader('Cookie')
        if (!cookieHeader) return null
        return cookie.parse(cookieHeader)[LOOKUP_COOKIE] || null
      }

      const setCookie = async (language: string) => {
        const cookieOptions = getCookieOptions()

        const serializedCookie = cookie.serialize(
          LOOKUP_COOKIE,
          language,
          cookieOptions,
        )

        addResponseCookie(serializedCookie)
      }

      const language = getLanguage()

      if (!language) {
        await setCookie(requestI18n.language)
        return
      }

      if (language !== requestI18n.language) {
        await requestI18n.changeLanguage(language)
        await setCookie(language)
        return
      }
    }

    await changeLanguage()

    const initialLanguage = requestI18n.language
    const initialI18nStore = requestI18n.services.resourceStore.data

    return next({
      context: {
        i18next: [initialI18nStore, initialLanguage],
      },
    })
  },
)
