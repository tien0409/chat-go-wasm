import clsx from 'clsx'
import { memo } from 'react'
import useConversationStore from '../stores/useConversationStore'
import IConversation from '../interfaces/IConversation'
import chatRepository from '../repositories/chat-repository'
import userRepository from '../repositories/user-repository'

type ConversationItemProps = {
  conversation: IConversation
}

const ConversationItem = (props: ConversationItemProps) => {
  const { conversation } = props

  const { currentConversation, setCurrentRatchetId, setMessages, setCurrentConversation } =
    useConversationStore()

  const createRatchet = async () => {
    const res = await userRepository.getExternalUserKey(conversation.receiver)
    const initRatchetRes = await window.initRatchetFromInternal(JSON.stringify(res.data))
    await chatRepository.initChatSession({
      chatSessionId: initRatchetRes.ratchetId,
      ephemeralKey: initRatchetRes.ephemeralKey,
      receiverUserName: conversation.receiver
    })
    await window.api.writeRatchetFile(conversation.receiver, initRatchetRes)
    await window.saveRatchet(initRatchetRes.ratchetId)
    return initRatchetRes.ratchetId
  }

  const handleSelectConversation = async () => {
    try {
      setCurrentConversation(conversation.receiver)
      const res = await chatRepository.getPendingChatMessage(conversation.id)
      setMessages(res.data)

      let ratchetId = await window.api.getRatchetId(conversation.receiver)

      if (ratchetId) {
        const isExist = await window.isRatchetExist(ratchetId)
        console.log('isExist', isExist)

        if (!isExist) {
          ratchetId = await createRatchet()
        }
      } else {
        ratchetId = await createRatchet()
      }

      setCurrentRatchetId(ratchetId)
    } catch (error) {
      console.error('ERROR', error)
    }
  }

  return (
    <div
      className={clsx(
        'border-b cursor-pointer flex gap-x-3 justify-between hover:bg-black/10 w-full p-3 items-center',
        currentConversation === conversation.receiver && 'bg-yellow-50/80'
      )}
      onClick={handleSelectConversation}
    >
      <div className="flex gap-2 items-center flex-1 ">
        <img
          src="https://source.unsplash.com/RZrIJ8C0860"
          alt="image"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col overflow-hidden">
          <h4 className="font-semibold text-sm">{conversation.receiver}</h4>
          <p className="line-clamp-1 text-xs text-gray-400">{conversation.lastMessage}</p>
        </div>
      </div>

      <span className="w-2 h-2 rounded-full bg-green-500"></span>
    </div>
  )
}

export default memo(ConversationItem)
