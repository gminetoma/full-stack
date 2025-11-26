/// <reference types="vite/client" />

import { createRootRoute, useLoaderData } from '@tanstack/react-router'
import RootLayout from '~/src/layouts/RootLayout'
import NotFound from '~/src/pages/NotFound'
import appCss from '~/src/styles/app.css?url'
import { handleThemeMode } from '../lib/theme-mode/shared'

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
    if (!data.i18next) throw new MissingI18nextResourcesException()

    const { i18next, themeMode } = data

    return (
      <RootLayout
        useSSRProps={i18next}
        serverThemeMode={handleThemeMode(themeMode)}
      />
    )
  },
})
