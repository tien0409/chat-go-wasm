import Input from './Input'
import { SendHorizonal } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import useConversationStore from '../stores/useConversationStore'
import useWebSocketStore from '../stores/useWebSocketStore'
import IMessage from '../interfaces/IMessage'
import useAuthStore from '../stores/useAuthStore'

type MessageFormProps = {
  handleScroll: (content: string) => void
}

const MessageForm = (props: MessageFormProps) => {
  const { handleScroll } = props

  const { messages, setMessages, currentRatchetId } = useConversationStore()
  const { websocket } = useWebSocketStore()
  const { userInfo } = useAuthStore()

  const [content, setContent] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = content.trim()
    if (!value) return

    const res = await window.sendMessage(currentRatchetId!, false, content)
    websocket?.send(
      JSON.stringify({
        type: 'CHAT_TEXT',
        senderUsername: userInfo?.username,
        plainMessage: '',
        chatSessionId: currentRatchetId,
        index: res.index,
        cipherMessage: res.cipherMessage,
        isBinary: res.isBinary
      })
    )

    setMessages([...messages, { content } as IMessage])
    setContent('')
    handleScroll(value)
  }

  useEffect(() => {
    if (websocket)
      websocket.onmessage = (msg) => {
        console.log('msg', msg)
      }
  }, [websocket])

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
