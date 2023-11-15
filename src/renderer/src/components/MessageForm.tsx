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
        wrapperClass="h-full w-full"
        inputClass="pr-12"
        placeholder="Enter message..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <SendHorizonal className="absolute -translate-y-1/2 top-1/2 right-6" />

      <button type="submit" hidden>
        submit
      </button>
    </form>
  )
}

export default MessageForm
