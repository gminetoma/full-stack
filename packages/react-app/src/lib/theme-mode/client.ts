import { createClientOnlyFn } from '@tanstack/react-start'
import cookie from 'js-cookie'
import {
  DEFAULT_SYSTEM_THEME_MODE,
  getCookieOptions,
  LOOKUP_COOKIE,
  SupportedThemeModes,
} from './shared'

const MATCH_MEDIA_DARK = '(prefers-color-scheme: dark)'
const MATCH_MEDIA_LIGHT = '(prefers-color-scheme: light)'

/** @client */
export const getThemeModeSystem = createClientOnlyFn(() => {
  if (window.matchMedia(MATCH_MEDIA_DARK).matches) {
    return SupportedThemeModes.SystemDark
  }

  if (window.matchMedia(MATCH_MEDIA_LIGHT)) {
    return SupportedThemeModes.SystemLight
  }

  return DEFAULT_SYSTEM_THEME_MODE
})

/** @client */
export const setThemeModeCookie = createClientOnlyFn(
  (themeMode: SupportedThemeModes) => {
    cookie.set(LOOKUP_COOKIE, themeMode, getCookieOptions())
  },
)

/**
 * Starts the theme mode listeners.
 * @returns The cleanup callback.
 * @client */
export const startThemeModeSystemManager = createClientOnlyFn(
  (setThemeMode: (value: SupportedThemeModes) => void) => {
    const themeModeDarkMatchMedia = window.matchMedia(MATCH_MEDIA_DARK)

    const themeModeDarkMatchMediaCallback = (event: MediaQueryListEvent) => {
      if (event.matches) setThemeMode(SupportedThemeModes.SystemDark)
    }

    const themeModeLightMatchMedia = window.matchMedia(MATCH_MEDIA_LIGHT)

    const themeModeLightMatchMediaCallback = (event: MediaQueryListEvent) => {
      if (event.matches) setThemeMode(SupportedThemeModes.SystemLight)
    }

    const startListeners = () => {
      themeModeDarkMatchMedia.addEventListener(
        'change',
        themeModeDarkMatchMediaCallback,
      )

      themeModeLightMatchMedia.addEventListener(
        'change',
        themeModeLightMatchMediaCallback,
      )
    }

    const stopListeners = () => {
      themeModeDarkMatchMedia.removeEventListener(
        'change',
        themeModeDarkMatchMediaCallback,
      )

      themeModeLightMatchMedia.removeEventListener(
        'change',
        themeModeLightMatchMediaCallback,
      )
    }

    startListeners()

    return stopListeners
  },
)

export const getDocumentThemeMode = createClientOnlyFn(() => {
  return document.documentElement.dataset.themeMode || DEFAULT_SYSTEM_THEME_MODE
})
