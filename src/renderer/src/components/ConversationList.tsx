import ConversationItem from './ConversationItem'
import useConversationStore from '../stores/useConversationStore'
import useWebSocketStore from '../stores/useWebSocketStore'
import { useCallback, useEffect } from 'react'
import { CHAT_NEW_EVENT, MESSAGE_EVENT } from '../configs/consts'
import IConversation from '../interfaces/IConversation'
import { toast } from 'react-toastify'
import userRepository from '../repositories/user-repository'
import chatRepository from '../repositories/chat-repository'

const ConversationList = () => {
  const { conversations, setConversations } = useConversationStore()
  const { websocket } = useWebSocketStore()

  const createRatchet = useCallback(async (receiver: string) => {
    const res = await userRepository.getExternalUserKey(receiver)
    const initRatchetRes = await window.initRatchetFromInternal(JSON.stringify(res.data))
    await chatRepository.initChatSession({
      chatSessionId: initRatchetRes.ratchetId,
      ephemeralKey: initRatchetRes.ephemeralKey,
      receiverUserName: receiver
    })
    const ratchetDetail = await window.saveRatchet(initRatchetRes.ratchetId)
    await window.api.createRatchetFile(receiver, ratchetDetail, initRatchetRes.ratchetId)
  }, [])

  useEffect(() => {
    if (!websocket) return
    websocket.onmessage = async (msg) => {
      console.log('msg', msg)
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
          createRatchet(data.senderUsername)
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
  }, [websocket, conversations, createRatchet, conversations])

  return (
    <div className="w-full h-full overflow-y-auto custom__scroll">
      {conversations.map((conversation, index) => (
        <ConversationItem conversation={conversation} key={index} />
      ))}
    </div>
  )
}

export default ConversationList
