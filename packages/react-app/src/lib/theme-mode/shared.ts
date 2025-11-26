import type { SerializeOptions } from 'cookie'
import { addMonths } from 'date-fns'
import { Map as IMap } from 'immutable'
import { type LucideIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'

export const LOOKUP_COOKIE = 'theme-mode'

export enum SupportedThemeModes {
  Light = 'light',
  Dark = 'dark',
  SystemLight = 'system-light',
  SystemDark = 'system-dark',
}

type SupportedThemeModesType = Record<
  SupportedThemeModes,
  { label: string; Icon: LucideIcon }
>

export const supportedThemeModes = IMap<SupportedThemeModesType>({
  [SupportedThemeModes.Dark]: { label: 'Dark', Icon: MoonIcon },
  [SupportedThemeModes.Light]: { label: 'Light', Icon: SunIcon },
  [SupportedThemeModes.SystemDark]: { label: 'System', Icon: MonitorIcon },
  [SupportedThemeModes.SystemLight]: { label: 'System', Icon: MonitorIcon },
})

export const DEFAULT_SYSTEM_THEME_MODE = SupportedThemeModes.SystemLight

export const isThemeMode = (value?: string): value is SupportedThemeModes => {
  const themeModes = Object.values(SupportedThemeModes)
  if (!value) return false
  return themeModes.includes(value as SupportedThemeModes)
}

export const isThemeModeDark = (value?: SupportedThemeModes) => {
  return (
    value?.includes(SupportedThemeModes.Dark) ||
    value?.includes(SupportedThemeModes.SystemDark)
  )
}

export const isThemeModeLight = (value?: SupportedThemeModes) => {
  return value?.includes(
    SupportedThemeModes.Light ||
      value.includes(SupportedThemeModes.SystemLight),
  )
}

export const isThemeModeSystem = (value?: SupportedThemeModes) => {
  return (
    value?.includes(SupportedThemeModes.SystemDark) ||
    value?.includes(SupportedThemeModes.SystemLight)
  )
}

export const handleThemeMode = (value?: SupportedThemeModes) => {
  if (!isThemeMode(value)) return DEFAULT_SYSTEM_THEME_MODE
  return value
}

export const getCookieOptions = () => {
  return {
    expires: addMonths(new Date(), 6),
    sameSite: 'strict',
  } satisfies SerializeOptions
}
