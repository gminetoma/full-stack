import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ContextHookMissuseException } from '../lib/exceptions/ContextHookMissuseException'
import {
  getDocumentThemeMode,
  getThemeModeSystem,
  setThemeModeCookie,
  startThemeModeSystemManager,
} from '../lib/theme-mode/client'
import {
  isThemeModeSystem,
  type SupportedThemeModes,
} from '../lib/theme-mode/shared'

type ThemeModeContextType = {
  themeMode: SupportedThemeModes
  setThemeMode: (themeMode: SupportedThemeModes) => void
}

const ThemeModeContext = createContext<ThemeModeContextType | null>(null)

export type ThemeModeProviderPropsWithoutChildren = Omit<
  ThemeModeProviderProps,
  'children'
>

type ThemeModeProviderProps = {
  children: ReactNode
  serverThemeMode: SupportedThemeModes
}

const ThemeModeProvider = (props: ThemeModeProviderProps) => {
  const { children, serverThemeMode } = props

  const [themeMode, setThemeMode] =
    useState<SupportedThemeModes>(serverThemeMode)

  const themeModeSystemCleanup = useRef<ReturnType<
    typeof startThemeModeSystemManager
  > | null>(null)

  const handleThemeMode = useCallback((newThemeMode: SupportedThemeModes) => {
    setThemeModeCookie(newThemeMode)
    document.documentElement.dataset.themeMode = newThemeMode
  }, [])

  useEffect(() => {
    const cleanup = () => {
      if (themeModeSystemCleanup.current) {
        themeModeSystemCleanup.current()
        themeModeSystemCleanup.current = null
      }
    }

    const setup = () => {
      const currentDocumentTheMode = getDocumentThemeMode()

      if (isThemeModeSystem(themeMode)) {
        const currentSystemThemeMode = getThemeModeSystem()

        themeModeSystemCleanup.current =
          startThemeModeSystemManager(setThemeMode)

        if (currentDocumentTheMode === currentSystemThemeMode) return cleanup

        setThemeMode(() => {
          handleThemeMode(currentSystemThemeMode)
          return currentSystemThemeMode
        })

        return cleanup
      }

      const isSameThemeMode = currentDocumentTheMode === themeMode
      if (isSameThemeMode) return
      handleThemeMode(themeMode)
    }

    return setup()
  }, [themeMode, handleThemeMode])

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export const useThemeModeContext = () => {
  const context = useContext(ThemeModeContext)

  if (context) return context

  throw new ContextHookMissuseException({
    hookName: 'useThemeModeContext',
    providerName: 'ThemeModeProvider',
  })
}

export default ThemeModeProvider
