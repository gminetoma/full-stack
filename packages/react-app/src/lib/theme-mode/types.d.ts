import type { SupportedThemeModes } from './shared'

declare module '~/src/types/app' {
  interface AppContext {
    themeMode?: SupportedThemeModes
  }
}

declare module 'react' {
  interface HTMLAttributes {
    'data-theme-mode'?: SupportedThemeModes
  }
}

declare global {
  interface HTMLElement {
    dataset: DOMStringMap & { themeMode?: SupportedThemeModes }
  }
}
