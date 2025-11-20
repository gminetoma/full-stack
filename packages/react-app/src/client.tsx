import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { i18nextInit } from './lib/i18next/client'

const main = async () => {
  await i18nextInit()

  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  )
}

main()
