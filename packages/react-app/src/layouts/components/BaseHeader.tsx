import cn from '~/src/lib/cn'

const headerCn = cn('flex prose dark:prose-invert p-5 min-w-full justify-center text-center')

const BaseHeader = () => {
  return (
    <header className={headerCn}>
      <h1>Full Stack Boilerplate</h1>
    </header>
  )
}

export default BaseHeader
