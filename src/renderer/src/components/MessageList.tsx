import MessageItem from './MessageItem'
import { memo, MouseEvent, MutableRefObject, useEffect, useState } from 'react'
import { MoveDown } from 'lucide-react'
import useConversationStore from '../stores/useConversationStore'
import useWebSocketStore from '../stores/useWebSocketStore'
import { MESSAGE_EVENT } from '../configs/consts'

type MessageListProps = {
  lastMessageRef: MutableRefObject<HTMLDivElement | null>
  handleScrollBottom: () => void
}

const MessageList = (props: MessageListProps) => {
  const { lastMessageRef, handleScrollBottom } = props

  const { messages, currentConversation, setMessages } = useConversationStore()
  const { websocket } = useWebSocketStore()

  const [isBottom, setIsBottom] = useState(false)

  const handleScroll = (e: MouseEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  }

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (websocket)
      websocket.onmessage = async (msg) => {
        if (msg.type === MESSAGE_EVENT) {
          const data = JSON.parse(msg.data)
          const content = await window.receiveMessage(
            JSON.stringify({
              chatSessionId: data.chatSessionId,
              index: data.index,
              cipherMessage: data.cipherMessage,
              isBinary: data.isBinary
            })
          )

          const newMessage = {
            index: data.index,
            content: content,
            type: data.type,
            sender: data.senderUsername
          }

          if (data.senderUsername === currentConversation) {
            setMessages([...messages, newMessage])
            await window.api.addMessageToRatchet(currentConversation!, [newMessage])
            requestIdleCallback(() => {
              lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
            })
          }
        }
      }
  }, [websocket, messages])

  return (
    <div
      className="h-full overflow-y-auto custom__scroll px-4 flex flex-col gap-4"
      onScroll={handleScroll}
    >
      {messages.map((message, index) => (
        <MessageItem message={message} key={index} />
      ))}
      {!isBottom && (
        <div
          className="w-10 rounded-full flex items-center justify-center cursor-pointer bg-white h-10 border absolute bottom-20 left-1/2"
          onClick={handleScrollBottom}
        >
          <MoveDown />
        </div>
      )}
      <div ref={lastMessageRef}></div>
    </div>
  )
}

export default memo(MessageList)
