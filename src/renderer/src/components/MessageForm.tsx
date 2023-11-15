import Input from './Input'
import { SendHorizonal } from 'lucide-react'
import { FormEvent, useState } from 'react'

const MessageForm = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className="flex relative h-full px-4" onSubmit={handleSubmit}>
      <Input
        className="h-full w-full"
        placeholder="Enter message..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="absolute -translate-y-1/2 top-1/2 right-6" type="submit">
        <SendHorizonal />
      </button>
    </form>
  )
}

export default MessageForm
