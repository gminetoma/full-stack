import { createStart } from '@tanstack/react-start'
import { i18nextMiddleware } from './lib/i18next'

export const startInstance = createStart(() => ({
  defaultSsr: true,
  requestMiddleware: [i18nextMiddleware],
}))
