/// <reference types="@tanstack/react-start" />

import type { useSSR } from 'react-i18next'

type AppContext = {
  i18next?: Parameters<typeof useSSR>
}

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: AppContext
    }
  }
}
