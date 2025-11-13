import { Outlet } from '@tanstack/react-router'
import type { useSSR } from 'react-i18next'
import Html from './Html'

type RootProps = {
  useSSRProps: Parameters<typeof useSSR>
}

const Root = (props: RootProps) => {
  const { useSSRProps } = props

  // useSSR(...useSSRProps)

  return (
    <Html>
      <Outlet />
    </Html>
  )
}

export default Root
