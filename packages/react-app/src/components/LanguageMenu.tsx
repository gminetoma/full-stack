'use client'

import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/src/components/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/src/components/shadcn/dropdown-menu'
import { supportedLanguages } from '../lib/i18next/shared'

const Example = () => {
  const { i18n } = useTranslation()

  const onValueChange = async (value: string) => {
    i18n.changeLanguage(value)
  }

  const renderSupportedLanguages = () => {
    return supportedLanguages.entrySeq().map(([key, { label, labelShort }]) => {
      return (
        <DropdownMenuRadioItem value={String(key)} key={key}>
          <span className="flex items-center gap-2">
            <span className="text-xs">{labelShort}</span>
            <span>{label}</span>
          </span>
        </DropdownMenuRadioItem>
      )
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Languages className="h-4 w-4" />
          Language
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          onValueChange={onValueChange}
          value={i18n.language}
        >
          {renderSupportedLanguages()}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Example
