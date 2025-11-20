import type { SerializeOptions } from 'cookie'
import { addMonths } from 'date-fns'
import type { InitOptions } from 'i18next'
import { Map as IMap } from 'immutable'

type SupportedLanguagesType = {
  [key: string]: {
    label: string
    labelShort: string
  }
}

export const supportedLanguages = IMap<SupportedLanguagesType>({
  en: { label: 'English', labelShort: 'US' },
  pt: { label: 'Português', labelShort: 'PT' },
})

const supportedLngs = supportedLanguages.keySeq().toArray() as string[]

export const defaultOptions = {
  preload: ['en'],
  supportedLngs,
  nonExplicitSupportedLngs: false,
  ns: ['common'],
  fallbackLng: 'en',
  defaultNS: 'common',
  load: 'languageOnly',
  react: {
    useSuspense: false,
  },
} satisfies InitOptions

export const getCookieOptions = () => {
  return {
    expires: addMonths(new Date(), 6),
    sameSite: 'strict',
  } satisfies SerializeOptions
}

export const LOOKUP_COOKIE = 'i18next'
