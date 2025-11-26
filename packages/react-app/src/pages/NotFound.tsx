import NotFoundSvg from '~/src/assets/404.svg?react'
import cn from '../lib/cn'

const NotFound = () => {
  return (
    <section className={sectionCn}>
      <NotFoundSvg className={svgCn} />
    </section>
  )
}

const sectionCn = cn('flex grow justify-center items-center')
const svgCn = cn('size-4/5 md:size-1/2 transition-[height]')

export default NotFound
