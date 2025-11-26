import { Outlet } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'
import BaseHeader from '../components/BaseHeader'

const MarketingLayout = () => {
  return (
    <Fragment>
      <BaseHeader />
      <Outlet />
    </Fragment>
  )
}

export default MarketingLayout
