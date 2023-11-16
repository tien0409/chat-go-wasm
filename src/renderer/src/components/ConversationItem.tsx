import clsx from 'clsx'
import { memo } from 'react'
import useConversationStore from '../stores/useConversationStore'
import IConversation from '../interfaces/IConversation'

type ConversationItemProps = {
  conversation: IConversation
}

const ConversationItem = (props: ConversationItemProps) => {
  const { conversation } = props

  const currentConversation = useConversationStore((state) => state.currentConversation)
  const setCurrentConversation = useConversationStore((state) => state.setCurrentConversation)

  return (
    <div
      className={clsx(
        'border-b cursor-pointer flex gap-x-3 justify-between hover:bg-black/10 w-full p-3 items-center',
        currentConversation === conversation.id && 'bg-yellow-50/80'
      )}
      onClick={() => setCurrentConversation(conversation.id)}
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
