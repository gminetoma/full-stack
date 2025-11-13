import { createFileRoute } from '@tanstack/react-router'
import Home from '~/src/pages/Marketing'

export const Route = createFileRoute('/_marketing/')({
  component: Home,
})
