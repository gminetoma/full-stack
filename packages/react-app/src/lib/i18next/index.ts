import {
  createClientOnlyFn,
  createMiddleware,
  createServerFn,
} from '@tanstack/react-start'
import { setResponseHeaders } from '@tanstack/react-start/server'
import i18next, { type InitOptions } from 'i18next'
import Backend, { type FsBackendOptions } from 'i18next-fs-backend'
import {
  handle,
  LanguageDetector,
  type LanguageDetectorOptions,
} from 'i18next-http-middleware'
import type { useSSR } from 'react-i18next'
import { LOCALES_PATH } from '~/config/paths'
import MissingI18nextInstanceException from './exceptions/MissingI18nextInstanceException'

const defaultOptions = {
  preload: ['en'],
  ns: ['common'],
  fallbackLng: 'en',
  defaultNS: 'common',
} satisfies InitOptions

export const i18nextMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const i18nextOptions = {
      ...defaultOptions,
      detection: {
        caches: ['cookie'],
        order: [],
      } satisfies LanguageDetectorOptions,
      backend: {
        loadPath: `${LOCALES_PATH}/{{lng}}/{{ns}}.json`,
      } satisfies FsBackendOptions,
    } satisfies InitOptions

    i18next.use(Backend).use(LanguageDetector).createInstance()

    await i18next.init(i18nextOptions)

    const response = new Response()

    await new Promise((resolve) => {
      const i18nextHandler = handle(i18next)
      i18nextHandler(request, response, resolve)
    })

    setResponseHeaders(response.headers)

    return next({ context: { i18n: request.i18n } })
  },
)

export const i18nextInit = createClientOnlyFn(() => {
  const i18nextOptions = {
    ...defaultOptions,
    detection: {
      order: [],
    },
  } satisfies InitOptions
})

const i18nextFnMiddlewareServerFn = createMiddleware({
  type: 'function',
}).server(({ next, context }) => {
  return next({
    sendContext: context,
  })
})

const i18nextMiddlewareClientFn = createMiddleware({ type: 'function' })
  .middleware([i18nextFnMiddlewareServerFn])
  .client(async ({ next }) => {
    return await next()
  })

export const i18nextServerFn = createServerFn()
  .middleware([i18nextMiddlewareClientFn])
  .handler(({ context }) => {
    const { i18n } = context

    if (!i18n) throw new MissingI18nextInstanceException()

    const initialLanguage = i18n.language
    const initialI18nStore = i18n.services.resourceStore.data

    return { useSSRProps: [initialI18nStore, initialLanguage] } satisfies {
      useSSRProps: Parameters<typeof useSSR>
    }
  })
