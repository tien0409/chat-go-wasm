import MessageItem from './MessageItem'
import { memo, MouseEvent, MutableRefObject, useEffect, useState } from 'react'
import { MoveDown } from 'lucide-react'
import useConversationStore from '../stores/useConversationStore'

type MessageListProps = {
  lastMessageRef: MutableRefObject<HTMLDivElement | null>
  handleScrollBottom: () => void
}

const MessageList = (props: MessageListProps) => {
  const { lastMessageRef, handleScrollBottom } = props

  const { messages } = useConversationStore()

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
