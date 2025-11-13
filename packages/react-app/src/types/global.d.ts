import type { i18n } from 'i18next'

declare global {
  interface Request {
    i18n?: i18n
  }
}
