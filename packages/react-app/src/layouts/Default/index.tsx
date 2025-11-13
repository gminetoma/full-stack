import { Outlet } from '@tanstack/react-router'
import type { ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
}

const Providers = (props: ProvidersProps) => {
  const { children } = props
  return children
}

const Default = () => {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}

export default Default
