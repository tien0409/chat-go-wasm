import clsx from 'clsx'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import useCallStore from '../stores/useCallStore'
import VideoCall from '../components/VideoCall'
import useConversationStore from '../stores/useConversationStore'
import chatRepository from '../repositories/chat-repository'
import { useEffect } from 'react'

const HomeScreen = () => {
  const { typeCall } = useCallStore()
  const { currentConversation, setConversations } = useConversationStore()

  const getChatSession = async () => {
    try {
      const res = await chatRepository.getPendingChatSession()
      if (res) {
        const newConversations = res.data.map((item) => {
          return {
            receiver: item.senderUserName,
            id: item.chatSessionId
          }
        })
        setConversations(newConversations)
      }
    } catch (error) {
      console.error('ERROR', error)
    }
  }

  useEffect(() => {
    getChatSession().then()
  }, [])

  return (
    <div className="flex h-screen w-screen relative">
      <div
        className={clsx(
          'bg-yellow-50 w-0 duration-700 relative overflow-hidden',
          typeCall && 'w-3/4'
        )}
      >
        <VideoCall />
      </div>

      <div className={clsx('w-1/4 h-full border-r overflow-hidden', typeCall && 'w-0 hidden')}>
        <Sidebar />
      </div>

      <div
        className={clsx(
          'bg-white flex flex-col duration-700 overflow-hidden relative',
          typeCall ? 'w-1/4' : 'w-3/4'
        )}
      >
        {currentConversation ? (
          <Chat />
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
            <h1 className="text-2xl font-bold">Welcome to Chat App</h1>
            <p className="text-gray-500 mt-2">
              Select a conversation from the sidebar or start a new one.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
