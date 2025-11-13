import { createFileRoute } from '@tanstack/react-router'
import Default from '~/src/layouts/Default'

export const Route = createFileRoute('/app')({
  component: Default,
})
