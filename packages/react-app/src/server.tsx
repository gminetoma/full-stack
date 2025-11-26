import { renderRouterToStream } from '@tanstack/react-router/ssr/server'
import {
  createStartHandler,
  StartServer as DefaultStartServer,
  defineHandlerCallback,
} from '@tanstack/react-start/server'
import type { ServerEntry } from '@tanstack/react-start/server-entry'
import type { ComponentProps } from 'react'
import { i18nextInit } from './lib/i18next/server'
import SharedProviders, {
  type SharedProvidersPropsWithoutChildren,
} from './providers/SharedProviders'

type StartServerProps = ComponentProps<typeof DefaultStartServer> &
  SharedProvidersPropsWithoutChildren

const StartServer = (props: StartServerProps) => {
  const { i18n, ...defaultStartServerProps } = props

  return (
    <SharedProviders i18n={i18n}>
      <DefaultStartServer {...defaultStartServerProps} />
    </SharedProviders>
  )
}
class MissingI18nextInstanceException extends Error {
  constructor() {
    super(
      'Missing i18next instance. Please ensure i18next is properly initialized.',
    )
    this.name = 'MissingI18nextInstanceException'
  }
}

await i18nextInit()

/** @see https://github.com/TanStack/router/blob/main/packages/react-start-server/src/defaultStreamHandler.tsx */
const customHandler = defineHandlerCallback(async (context) => {
  const { router, request } = context

  if (!request.i18n) throw new MissingI18nextInstanceException()

  return renderRouterToStream({
    ...context,
    children: <StartServer router={router} i18n={request.i18n} />,
  })
})

const fetch = createStartHandler(customHandler)

/** @see https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point */
const serverEntry: ServerEntry = { fetch }

export default serverEntry
