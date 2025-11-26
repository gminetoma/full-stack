import { Outlet } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'

const AppLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}

export default AppLayout
