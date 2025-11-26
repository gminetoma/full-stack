import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/src/components/shadcn/dropdown-menu'
import cn from '../lib/cn'
import {
  type SupportedLanguages,
  SupportedNameSpaces,
  supportedLanguages,
} from '../lib/i18next/shared'
import { Button } from './shadcn/button'

const DropdownLanguageMenu = () => {
  const { t, i18n } = useTranslation(SupportedNameSpaces.Components)

  const renderLanguageListItems = () => {
    const onClick = (language: SupportedLanguages) => {
      i18n.changeLanguage(language)
    }

    return supportedLanguages
      .entrySeq()
      .map(([language, { label, labelShort }]) => {
        return (
          <DropdownMenuItem key={language} onClick={() => onClick(language)}>
            <span className={languageShortCn}>{labelShort}</span>
            <span>{label}</span>
          </DropdownMenuItem>
        )
      })
  }

  const currentLanguage = i18n.language

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>{currentLanguage} | Language</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {t('dropdown-language-menu.label')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderLanguageListItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const languageShortCn = cn('text-[0.5rem]')

export default DropdownLanguageMenu
