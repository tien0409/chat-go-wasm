import Input from './Input'
import { SendHorizonal } from 'lucide-react'
import { FormEvent, useState } from 'react'

type MessageFormProps = {
  handleSendMessage: (content: string) => void
}

const MessageForm = (props: MessageFormProps) => {
  const { handleSendMessage } = props

  const [content, setContent] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = content.trim()
    if (!value) return

    handleSendMessage(value)
    setContent('')
  }

  return (
    <form className="flex relative h-full px-4" onSubmit={handleSubmit}>
      <Input
        wrapperClass="h-full w-full"
        inputClass="pr-12"
        placeholder="Enter message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <SendHorizonal className="absolute -translate-y-1/2 top-1/2 right-6" />

      <button type="submit" hidden>
        submit
      </button>
    </form>
  )
}

export default MessageForm
