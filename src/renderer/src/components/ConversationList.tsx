import ConversationItem from './ConversationItem'
import useConversationStore from '../stores/useConversationStore'

const ConversationList = () => {
  const conversations = useConversationStore((state) => state.conversations)

  return (
    <div className="w-full h-full overflow-y-auto custom__scroll">
      {conversations.map((conversation, index) => (
        <ConversationItem conversation={conversation} key={index} />
      ))}
    </div>
  )
}

export default ConversationList
