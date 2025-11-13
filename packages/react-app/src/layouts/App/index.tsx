import { Outlet } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'

const App = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}

export default App
