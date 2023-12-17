import ConversationItem from './ConversationItem'
import useConversationStore from '../stores/useConversationStore'
import useWebSocketStore from '../stores/useWebSocketStore'
import { useCallback, useEffect } from 'react'
import { CHAT_NEW_EVENT, MESSAGE_EVENT } from '../configs/consts'
import IConversation from '../interfaces/IConversation'
import { toast } from 'react-toastify'
import chatRepository from '../repositories/chat-repository'

const ConversationList = () => {
  const {
    setChatAction,
    setMessages,
    currentConversation,
    messages,
    conversations,
    setConversations
  } = useConversationStore()
  const { websocket } = useWebSocketStore()

  // eslint-disable-next-line
  const createRatchet = useCallback(async (additionalData: any, senderUserName: string) => {
    const ratchetRes = await window.initRatchetFromExternal(
      JSON.stringify(additionalData.senderKeyBundle),
      additionalData.ephemeralKey,
      additionalData.chatSessionId
    )
    await chatRepository.completeChatSession(ratchetRes.ratchetId)
    const ratchetDetail = await window.saveRatchet(ratchetRes.ratchetId)
    await window.api.createRatchetFile(senderUserName, ratchetDetail, ratchetRes.ratchetId)
  }, [])

  useEffect(() => {
    if (!websocket) return
    websocket.onmessage = async (msg) => {
      const data = JSON.parse(msg.data)
      switch (data.type) {
        case CHAT_NEW_EVENT: {
          const newConversation: IConversation = {
            id: data.chatSessionId,
            receiver: data.senderUsername,
            lastMessage: ''
          }
          setConversations([newConversation, ...conversations])
          if (data.plainMessage) toast.info(data.plainMessage)
          createRatchet(data.additionalData, data.senderUsername)
          break
        }

        case MESSAGE_EVENT: {
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
            setChatAction('add')
          }

          await window.api.addMessageToRatchet(data.senderUsername!, [newMessage])

          const conversationIndex = conversations.findIndex(
            (item) => item.id === data.chatSessionId
          )
          const newConversations = [...conversations]
          if (!newConversations[conversationIndex]) return
          newConversations[conversationIndex].lastMessage = content
          const temp = newConversations[conversationIndex]
          newConversations.splice(conversationIndex, 1)
          newConversations.unshift(temp)
          setConversations(newConversations)

          // save new ratchet detail
          const ratchetDetail = await window.saveRatchet(data.chatSessionId!)
          await window.api.changeRatchetDetail(data.senderUsername!, ratchetDetail)
          break
        }
      }
    }
  }, [websocket, conversations, createRatchet, messages, setMessages])

  return (
    <div className="w-full h-full overflow-y-auto custom__scroll">
      {conversations.map((conversation, index) => (
        <ConversationItem conversation={conversation} key={index} />
      ))}
    </div>
  )
}

export default ConversationList
