import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/src/components/shadcn/card'
import cn from '~/src/lib/cn'
import useCardsInfo from './useCardsInfo'

const HomePage = () => {
  const { t } = useTranslation('marketing')
  const { featureCardsInfo } = useCardsInfo()

  const renderCardListItems = () =>
    featureCardsInfo.map(({ content, header, footer, key }) => {
      return (
        <li key={key}>
          <Card className={cardCn}>
            <CardHeader>
              <CardTitle>
                <h2>{header}</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>{content}</CardContent>
            <CardFooter className={cardFooterCn}>{footer}</CardFooter>
          </Card>
        </li>
      )
    })

  return (
    <section className={featuresSectionCn}>
      <h2>{t('home.feature-section-header')}</h2>
      <ul className={cardListCn}>{renderCardListItems()}</ul>
    </section>
  )
}

const featuresSectionCn = cn(
  'flex flex-col items-center justify-center grow prose dark:prose-invert page-section min-w-full text-center',
)

const cardCn = cn('max-w-sm w-full')
const cardFooterCn = cn('flex items-center justify-center')
const cardListCn = cn('flex flex-col not-prose gap-6')

export default HomePage
