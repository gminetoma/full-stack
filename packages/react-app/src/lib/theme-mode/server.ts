import { createMiddleware } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import cookie from 'cookie'
import addResponseCookie from '../addResponseCookie'
import {
  DEFAULT_SYSTEM_THEME_MODE,
  getCookieOptions,
  isThemeMode,
  LOOKUP_COOKIE,
} from './shared'

export const themeModeMiddleware = createMiddleware().server(({ next }) => {
  const getThemeMode = () => {
    const cookieHeader = getRequestHeader('Cookie')
    if (!cookieHeader) return null
    return cookie.parse(cookieHeader)[LOOKUP_COOKIE] || null
  }

  const themeMode = getThemeMode()

  if (!themeMode || !isThemeMode(themeMode)) {
    const themeModeCookie = cookie.serialize(
      LOOKUP_COOKIE,
      DEFAULT_SYSTEM_THEME_MODE,
      getCookieOptions(),
    )

    addResponseCookie(themeModeCookie)

    return next({ context: { themeMode: DEFAULT_SYSTEM_THEME_MODE } })
  }

  return next({ context: { themeMode } })
})
