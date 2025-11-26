/// <reference types="@tanstack/react-start" />

// biome-ignore lint/suspicious/noEmptyInterface: Extensible app context
interface AppContext {}

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: AppContext
    }
  }
}

export {}