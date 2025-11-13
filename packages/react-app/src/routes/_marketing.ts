import { createFileRoute } from '@tanstack/react-router'
import Default from '~/src/layouts/Default'

export const Route = createFileRoute('/_marketing')({
  component: Default,
})
