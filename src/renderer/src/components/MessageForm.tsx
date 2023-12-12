import Input from './Input'
import { SendHorizonal } from 'lucide-react'
import { FormEvent, useState } from 'react'
import useConversationStore from '../stores/useConversationStore'
import useWebSocketStore from '../stores/useWebSocketStore'
import useAuthStore from '../stores/useAuthStore'
import { TEXT_TYPE } from '../configs/consts'

type MessageFormProps = {
  handleScroll: (content: string) => void
}

const MessageForm = (props: MessageFormProps) => {
  const { handleScroll } = props

  const { messages, setMessages, currentRatchetId, currentConversation } = useConversationStore()
  const { websocket } = useWebSocketStore()
  const { userInfo } = useAuthStore()

  const [content, setContent] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = content.trim()
    if (!value) return

    console.log('currentRatchetId', currentRatchetId)
    const res = await window.sendMessage(currentRatchetId!, false, content)
    console.log('res', res)
    websocket?.send(
      JSON.stringify({
        type: TEXT_TYPE,
        senderUsername: userInfo?.userName,
        plainMessage: '',
        chatSessionId: currentRatchetId,
        index: res.index,
        cipherMessage: res.cipherMessage,
        isBinary: res.isBinary
      })
    )
    const newMessage = {
      index: res.index,
      content: value,
      type: TEXT_TYPE,
      sender: userInfo!.userName
    }

    await window.api.addMessageToRatchet(currentConversation!, [newMessage])

    setMessages([...messages, newMessage])
    setContent('')
    handleScroll(value)
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
