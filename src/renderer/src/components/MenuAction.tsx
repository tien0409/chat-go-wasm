import clsx from 'clsx'

type MenuActionProps = {
  isMenuOpen: boolean
  setIsMenuOpen: (value: boolean) => void
}

const MenuAction = (props: MenuActionProps) => {
  const { isMenuOpen, setIsMenuOpen } = props

  return (
    <div
      className={clsx(
        'fixed duration-300 inset-0 bg-black/20 z-20',
        isMenuOpen ? 'visible opacity-100' : 'opacity-0 invisible'
      )}
      onClick={() => setIsMenuOpen(false)}
    >
      <div
        className={clsx(
          'absolute top-0 duration-300 bottom-0 left-0 w-1/4 bg-gray-800',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <ul>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  )
}

export default MenuAction
