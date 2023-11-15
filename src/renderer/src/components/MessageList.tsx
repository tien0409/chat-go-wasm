import MessageItem from './MessageItem'

const MessageList = () => {
  return (
    <div className="h-full overflow-y-auto px-4 flex flex-col gap-3">
      {Array(10)
        .fill(0)
        .map((_x, index) => (
          <MessageItem key={index} />
        ))}
    </div>
  )
}

export default MessageList
