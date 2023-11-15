import ConversationItem from './ConversationItem'

const ConversationList = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
      {Array(25)
        .fill(0)
        .map((_x, index) => (
          <ConversationItem key={index} />
        ))}
    </div>
  )
}

export default ConversationList
