import { StartClient as DefaultStartClient } from '@tanstack/react-start/client'
import type { ComponentProps } from 'react'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { i18nextInit } from './lib/i18next/client'
import SharedProviders, {
  type SharedProvidersPropsWithoutChildren,
} from './providers/SharedProviders'

type StartClientProps = ComponentProps<typeof DefaultStartClient> &
  SharedProvidersPropsWithoutChildren

const StartClient = (props: StartClientProps) => {
  const { i18n, ...defaultStartClientProps } = props
  return (
    <SharedProviders i18n={i18n}>
      <DefaultStartClient {...defaultStartClientProps} />
    </SharedProviders>
  )
}

const i18n = await i18nextInit()

hydrateRoot(
  document,
  <StrictMode>
    <StartClient i18n={i18n} />
  </StrictMode>,
)
