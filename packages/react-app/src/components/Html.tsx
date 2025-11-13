import { HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

const Html = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export default Html
