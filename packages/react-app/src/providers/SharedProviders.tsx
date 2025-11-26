import type { i18n } from 'i18next'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

export type SharedProvidersProps = {
  children: ReactNode
  i18n: i18n
}

export type SharedProvidersPropsWithoutChildren = Omit<
  SharedProvidersProps,
  'children'
>

const SharedProviders = (props: SharedProvidersProps) => {
  const { i18n, children } = props
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export default SharedProviders
