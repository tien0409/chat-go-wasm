import { Menu } from 'lucide-react'
import Input from './Input'
import { FormEvent, useState } from 'react'

const ConversationSearch = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="flex gap-x-4 p-4 items-center">
      <Menu className="cursor-pointer" />
      <form onSubmit={handleSearch}>
        <Input
          className="h-full"
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
