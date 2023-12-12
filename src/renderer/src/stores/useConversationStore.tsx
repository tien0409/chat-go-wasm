import { create } from 'zustand'
import IMessage from '../interfaces/IMessage'
import IConversation from '../interfaces/IConversation'

type IConversationStore = {
  currentRatchetId: string | null
  setCurrentRatchetId: (id: string | null) => void
  conversations: IConversation[]
  setConversations: (conversations: IConversation[]) => void
  currentConversation: string | null
  setCurrentConversation: (id: string | null) => void
  messages: IMessage[]
  setMessages: (messages: IMessage[]) => void
}

const useConversationStore = create<IConversationStore>((set) => ({
  currentRatchetId: null,
  setCurrentRatchetId: (id) => set({ currentRatchetId: id }),
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  currentConversation: null,
  setCurrentConversation: (id) => set({ currentConversation: id }),
  messages: [],
  setMessages: (messages) => set({ messages })
}))

export default useConversationStore
