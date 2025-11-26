import { motion } from 'motion/react'
import cn from '../lib/cn'
import {
  type SupportedThemeModes,
  supportedThemeModes,
} from '../lib/theme-mode/shared'
import { useThemeModeContext } from '../providers/ThemeModeProvider'
import { Button } from './shadcn/button'

const ThemeSwitcher = () => {
  const { setThemeMode, themeMode } = useThemeModeContext()

  const renderThemeModeListItems = () => {
    const onClick = (themeMode: SupportedThemeModes) => {
      setThemeMode(themeMode)
    }

    const seen = new Map<string, boolean>()

    return supportedThemeModes.entrySeq().map(([key, { Icon, label }]) => {
      if (seen.has(label)) return undefined

      seen.set(label, true)

      const isActive = label === supportedThemeModes.get(themeMode).label

      const renderActiveBackground = () => {
        if (!isActive) return

        return (
          <motion.div
            className={themeModeActiveBackground}
            layoutId="activeThemeMode"
            transition={{ type: 'spring', duration: 0.5 }}
          />
        )
      }

      return (
        <li key={key} className={themeModeListItem}>
          {renderActiveBackground()}
          <Button
            className={themeModeButtonCn}
            variant={'ghost'}
            aria-label={label}
            onClick={() => onClick(key)}
          >
            <Icon />
          </Button>
        </li>
      )
    })
  }

  return <ul className={themeModeListCn}>{renderThemeModeListItems()}</ul>
}

const themeModeListCn = cn('rounded-full ring flex overflow-hidden')
const themeModeListItem = cn('relative')
const themeModeButtonCn = cn('relative rounded-full z-10')

const themeModeActiveBackground = cn(
  'absolute inset-0 rounded-full bg-secondary z-0',
)

export default ThemeSwitcher
