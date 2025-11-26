import { createFileRoute } from '@tanstack/react-router'
import HomePage from '~/src/pages/Marketing/HomePage'

export const Route = createFileRoute('/_marketing/')({
  component: HomePage,
})
