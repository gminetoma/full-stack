/// <reference types="vite/client" />

import { createRootRoute, useLoaderData } from '@tanstack/react-router'
import Root from '~/src/components/Root'
import { i18nextServerFn } from '~/src/lib/i18next'
import NotFound from '~/src/pages/NotFound'
import appCss from '~/src/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Full Stack Boilerplate' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  notFoundComponent: NotFound,
  loader: async () => {
    const { useSSRProps } = await i18nextServerFn()
    return { useSSRProps }
  },
  component: () => {
    const { useSSRProps } = useLoaderData({ from: '__root__' })

    return <Root useSSRProps={useSSRProps} />
  },
})
