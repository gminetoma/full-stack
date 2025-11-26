import { HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import cn from '~/src/lib/cn'
import type { SupportedThemeModes } from '~/src/lib/theme-mode/shared'

export type HtmlPropsWithoutChildren = Omit<HtmlProps, 'children'>

type HtmlProps = {
  children: ReactNode
  serverThemeMode: SupportedThemeModes
}

const Html = (props: HtmlProps) => {
  const { children, serverThemeMode } = props

  return (
    <html lang="en" data-theme-mode={serverThemeMode}>
      <head>
        <HeadContent />
      </head>
      <body className={bodyCn}>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

const bodyCn = cn('flex w-dvw h-dvh flex-col')

export default Html
