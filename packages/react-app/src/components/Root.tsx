import { Outlet } from '@tanstack/react-router'
import {  useSSR } from 'react-i18next'
import Html from './Html'

type RootProps = {
  readonly useSSRProps: Parameters<typeof useSSR>
}

const Root = (props: RootProps) => {
  const { useSSRProps } = props

  useSSR(...useSSRProps)

  return (
    <Html>
      <Outlet />
    </Html>
  )
}

export default Root
