import { createServerOnlyFn } from '@tanstack/react-start'

import {
  getResponseHeaders,
  setResponseHeader,
} from '@tanstack/react-start/server'

/** @server */
const addResponseCookie = createServerOnlyFn((serializedCookie: string) => {
  const setCookie = getResponseHeaders().getSetCookie()
  setResponseHeader('Set-Cookie', [...setCookie, serializedCookie])
})

export default addResponseCookie
