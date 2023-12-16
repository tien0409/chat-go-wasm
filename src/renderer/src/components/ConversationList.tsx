import ConversationItem from './ConversationItem'
import useConversationStore from '../stores/useConversationStore'
import useWebSocketStore from '../stores/useWebSocketStore'
import { useEffect } from 'react'
import { CHAT_NEW_EVENT } from '../configs/consts'
import IConversation from '../interfaces/IConversation'
import { toast } from 'react-toastify'

const ConversationList = () => {
  const { conversations, setConversations } = useConversationStore()
  const { websocket } = useWebSocketStore()

  useEffect(() => {
    if (!websocket) return
    websocket.onmessage = (msg) => {
      console.log('msg', msg)
      if (msg.type === CHAT_NEW_EVENT) {
        const data = JSON.parse(msg.data)
        const newConversation: IConversation = {
          id: data.chatSessionId,
          receiver: data.senderUsername,
          lastMessage: ''
        }
        setConversations([newConversation, ...conversations])
        if (data.plainMessage) toast.info(data.plainMessage)
      }
    }
  }, [websocket, conversations])

  return (
    <div className="w-full h-full overflow-y-auto custom__scroll">
      {conversations.map((conversation, index) => (
        <ConversationItem conversation={conversation} key={index} />
      ))}
    </div>
  )
}

export default ConversationList
