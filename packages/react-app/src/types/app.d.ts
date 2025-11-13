import type { i18n } from 'i18next'

type AppContext = {
  i18n?: i18n
}

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext?: AppContext
    }
  }
}
