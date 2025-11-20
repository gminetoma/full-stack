/// <reference types="vite/client" />

import { createRootRoute, useLoaderData } from '@tanstack/react-router'
import Root from '~/src/components/Root'
import NotFound from '~/src/pages/NotFound'
import appCss from '~/src/styles/app.css?url'

class MissingI18nextResourcesException extends Error {
  constructor() {
    super(
      'Missing i18next resources. Please ensure all required translations are loaded.',
    )
    this.name = 'MissingI18nextResourcesException'
  }
}

class MissingLoaderDataException extends Error {
  constructor() {
    super('Required loader data is missing.')
    this.name = 'MissingLoaderDataException'
  }
}

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
  loader: async ({ serverContext }) => {
    return serverContext
  },
  component: () => {
    const data = useLoaderData({ from: '__root__' })

    if (!data) throw new MissingLoaderDataException()

    const { i18next } = data

    if (!i18next) throw new MissingI18nextResourcesException()

    return <Root useSSRProps={i18next} />
  },
})
