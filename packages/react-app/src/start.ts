import { createStart } from '@tanstack/react-start'
import { i18nextMiddleware } from './lib/i18next/server'
import { themeModeMiddleware } from './lib/theme-mode/server'

export const startInstance = createStart(() => ({
  defaultSsr: true,
  requestMiddleware: [themeModeMiddleware, i18nextMiddleware],
}))
