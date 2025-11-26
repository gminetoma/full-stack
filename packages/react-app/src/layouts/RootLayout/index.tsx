import { Outlet } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useSSR } from 'react-i18next'
import ThemeModeProvider, {
  type ThemeModeProviderPropsWithoutChildren,
} from '~/src/providers/ThemeModeProvider'
import Html from './Html'

type ProvidersPropsWithoutChildren = Omit<ProvidersProps, 'children'>

type ProvidersProps = ThemeModeProviderPropsWithoutChildren & {
  children: ReactNode
}

const Providers = (props: ProvidersProps) => {
  const { children, serverThemeMode } = props

  return (
    <ThemeModeProvider serverThemeMode={serverThemeMode}>
      {children}
    </ThemeModeProvider>
  )
}

type RootProps = ProvidersPropsWithoutChildren & {
  readonly useSSRProps: Parameters<typeof useSSR>
}

const RootLayout = (props: RootProps) => {
  const { useSSRProps, serverThemeMode } = props

  useSSR(...useSSRProps)

  return (
    <Html serverThemeMode={serverThemeMode}>
      <Providers serverThemeMode={serverThemeMode}>
        <Outlet />
      </Providers>
    </Html>
  )
}

export default RootLayout
