import { create } from 'zustand'
import IMessage from '../interfaces/IMessage'

type IConversationStore = {
  currentConversation: string | null
  setCurrentConversation: (id: string | null) => void
  messages: IMessage[]
  setMessages: (messages: IMessage[]) => void
}

const useConversationStore = create<IConversationStore>((set) => ({
  currentConversation: null,
  setCurrentConversation: (id) => set({ currentConversation: id }),
  messages: Array(255).fill({ content: 1 }),
  setMessages: (messages) => set({ messages })
}))

export default useConversationStore
