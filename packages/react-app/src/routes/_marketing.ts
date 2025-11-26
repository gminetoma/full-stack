import { createFileRoute } from '@tanstack/react-router'
import MarketingLayout from '../layouts/MarketingLayout'

export const Route = createFileRoute('/_marketing')({
  component: MarketingLayout,
})
