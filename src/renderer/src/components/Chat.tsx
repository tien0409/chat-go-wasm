import MessageList from './MessageList'
import MessageForm from './MessageForm'
import MessageSearch from './MessageSearch'
import useConversationStore from '../stores/useConversationStore'
import { useCallback, useRef } from 'react'
import IMessage from '../interfaces/IMessage'

const Chat = () => {
  const { messages, setMessages } = useConversationStore()
  const lastMessageRef = useRef<HTMLDivElement>(null)

  const handleScrollBottom = useCallback(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleSendMessage = (content: string) => {
    setMessages([...messages, { content } as IMessage])
    requestIdleCallback(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <>
      <MessageSearch />

      <div className="pt-4 flex-1 mb-16 overflow-auto">
        <MessageList lastMessageRef={lastMessageRef} handleScrollBottom={handleScrollBottom} />
      </div>

      <div className="mt-5 absolute bottom-2 inset-x-0">
        <MessageForm handleSendMessage={handleSendMessage} />
      </div>
    </>
  )
}

export default Chat
