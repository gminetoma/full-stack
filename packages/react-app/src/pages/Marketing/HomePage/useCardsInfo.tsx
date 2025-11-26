import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import DropdownLanguageMenu from '~/src/components/DropdownLanguageMenu'
import ThemeSwitcher from '~/src/components/ThemeSwitcher'

type CardInfo = {
  key: number
  header: string
  content: ReactNode
  footer?: ReactNode
}

const useCardsInfo = () => {
  const { t } = useTranslation('marketing')

  const featureCardsInfo: CardInfo[] = [
    {
      key: 1,
      header: t('home.card1-header'),
      content: t('home.card1-content'),
    },
    {
      key: 2,
      header: t('home.card2-header'),
      content: t('home.card2-content'),
      footer: <DropdownLanguageMenu />,
    },
    {
      key: 3,
      header: t('home.card3-header'),
      content: t('home.card3-content'),
      footer: <ThemeSwitcher />,
    },
  ]

  return { featureCardsInfo }
}

export default useCardsInfo
