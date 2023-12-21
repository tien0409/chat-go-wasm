import { Menu } from 'lucide-react'
import Input from './Input'
import { FormEvent, useState } from 'react'
import MenuAction from './MenuAction'
import userRepository from '../repositories/user-repository'
import useConversationStore from '../stores/useConversationStore'
import useAuthStore from '../stores/useAuthStore'
import IConversation from '../interfaces/IConversation'

const ConversationSearch = () => {
  const { setConversations } = useConversationStore()
  const { userInfo } = useAuthStore()

  const [searchValue, setSearchValue] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      let newConversations: IConversation[]

      // reset to old conversations
      if (searchValue.trim() === '') {
        const oldChatSessions = await window.api.getOldChatSessions(userInfo!.userName)
        newConversations = oldChatSessions
          .map((item) => ({
            lastMessage: item.lastMessage,
            receiver: item.receiver,
            id: item.ratchetId,
            updatedAt: item.updatedAt
          }))
          .sort((a, b) => {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          })
      } else {
        const res = await userRepository.searchUser(searchValue)
        newConversations =
          res.data
            ?.map((user) => ({
              id: user.id,
              receiver: user.userName,
              lastMessage: ''
            }))
            .filter((conversation) => conversation.id !== userInfo?.id) || []
      }
      setConversations(newConversations)
    } catch (error) {
      console.error('ERROR', error)
    }
  }

  return (
    <div className="flex gap-x-4 p-4 items-center">
      <Menu className="cursor-pointer" onClick={() => setIsMenuOpen(true)} />
      <MenuAction isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <form className="flex-1" onSubmit={handleSearch}>
        <Input
          wrapperClass="h-full w-full"
          inputSize={'sm'}
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" hidden>
          submit
        </button>
      </form>
    </div>
  )
}

export default ConversationSearch
