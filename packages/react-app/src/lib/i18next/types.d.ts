import type { i18n } from 'i18next'
import type { useSSR } from 'react-i18next'

declare module '~/src/types/app' {
  interface AppContext {
    i18next?: Parameters<typeof useSSR>
  }
}

declare global {
  interface Request {
    i18n?: i18n
  }
}
