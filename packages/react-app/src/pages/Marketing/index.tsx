import { useTranslation } from 'react-i18next'
import Example from '~/src/components/LanguageMenu'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div>
      {t('hello')}
      <Example />
    </div>
  )
}

export default Home
