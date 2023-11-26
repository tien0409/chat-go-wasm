import { Menu } from 'lucide-react'
import Input from './Input'
import { FormEvent, useState } from 'react'
import MenuAction from './MenuAction'
import userRepository from '../repositories/user-repository'

const ConversationSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const res = await userRepository.searchUser(searchValue)
      console.log('res', res)
    } catch (error) {
      console.error('ERROR', error)
    }
  }

  return (
    <div className="flex gap-x-4 p-4 items-center">
      <Menu className="cursor-pointer" onClick={() => setIsMenuOpen(true)} />
      <MenuAction isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <form className="flex-1" onSubmit={handleSearch}>
        <Input
          wrapperClass="h-full w-full"
          inputSize={'sm'}
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" hidden>
          submit
        </button>
      </form>
    </div>
  )
}

export default ConversationSearch
