import {
  createStartHandler,
  defaultStreamHandler,
  defineHandlerCallback,
} from '@tanstack/react-start/server'
import type { ServerEntry } from '@tanstack/react-start/server-entry'
import { i18nextInit } from './lib/i18next/server'

await i18nextInit()

const customHandler = defineHandlerCallback(async (context) => {
  return defaultStreamHandler(context)
})

const fetch = createStartHandler(customHandler)

/** @see https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point */
const serverEntry: ServerEntry = { fetch }

export default serverEntry
