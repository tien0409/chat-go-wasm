import { create } from 'zustand'
import IMessage from '../interfaces/IMessage'
import IConversation from '../interfaces/IConversation'

type IConversationStore = {
  conversations: IConversation[]
  setConversations: (conversations: IConversation[]) => void
  currentConversation: string | null
  setCurrentConversation: (id: string | null) => void
  messages: IMessage[]
  setMessages: (messages: IMessage[]) => void
}

const initConversations = Array(10)
  .fill({
    id: '1',
    receiver: 'Username',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto beatae odit perferendis reiciendis repellendus. Eos odit optio reiciendis tempora?'
  } as IConversation)
  .map((x) => ({ ...x, id: Math.random().toString() }))

const useConversationStore = create<IConversationStore>((set) => ({
  conversations: initConversations,
  setConversations: (conversations) => set({ conversations }),
  currentConversation: null,
  setCurrentConversation: (id) => set({ currentConversation: id }),
  messages: Array(255).fill({ content: 1 }),
  setMessages: (messages) => set({ messages })
}))

export default useConversationStore
