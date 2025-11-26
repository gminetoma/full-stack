import { createClientOnlyFn } from '@tanstack/react-start'
import type { InitOptions } from 'i18next'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { defaultOptions, getCookieOptions, LOOKUP_COOKIE } from './shared'

/** @client */
export const i18nextInit = createClientOnlyFn(async () => {
  if (i18next.isInitialized) return i18next

  const cookieOptions = getCookieOptions()

  const i18nextOptions = {
    ...defaultOptions,
    detection: {
      order: ['cookie'],
      caches: ['cookie'],
      lookupCookie: LOOKUP_COOKIE,
      cookieOptions,
    },
  } satisfies InitOptions

  await i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nextOptions)

  return i18next
})
