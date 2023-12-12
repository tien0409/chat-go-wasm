import clsx from 'clsx'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import useCallStore from '../stores/useCallStore'
import VideoCall from '../components/VideoCall'
import useConversationStore from '../stores/useConversationStore'
import chatRepository from '../repositories/chat-repository'
import { useCallback, useEffect } from 'react'
import IConversation from '../interfaces/IConversation'
import useAuthStore from '../stores/useAuthStore'

const HomeScreen = () => {
  const { typeCall } = useCallStore()
  const { currentConversation, setConversations } = useConversationStore()
  const { userInfo } = useAuthStore()

  const initRatchet = async () => {
    try {
      const ratchetList = await window.api.getRatchetDetailList(userInfo!.userName)
      for (const ratchet of ratchetList) {
        await window.loadRatchet(JSON.stringify(ratchet))
      }
    } catch (error) {
      console.error('ERROR', error)
    }
  }

  const getChatSession = useCallback(async () => {
    try {
      // init chat
      const oldChatSessions = await window.api.getOldChatSessions(userInfo!.userName)
      const newConversations: IConversation[] = oldChatSessions.map((item) => ({
        lastMessage: '',
        receiver: item.receiver,
        id: item.ratchetId
      }))

      // get pending chat session
      const res = await chatRepository.getPendingChatSession()

      if (res) {
        for (const item of res.data) {
          console.log('item', item)
          const ratchetRes = await window.initRatchetFromExternal(
            JSON.stringify(item.senderKeyBundle),
            item.ephemeralKey,
            item.chatSessionId
          )
          await chatRepository.completeChatSession(ratchetRes.ratchetId)
          const ratchetDetail = await window.saveRatchet(ratchetRes.ratchetId)
          await window.api.createRatchetFile(
            item.senderUserName,
            ratchetDetail,
            ratchetRes.ratchetId
          )

          newConversations.push({
            lastMessage: '',
            receiver: item.senderUserName,
            id: item.chatSessionId
          })
        }
        setConversations(newConversations)
      }
    } catch (error) {
      console.error('ERROR', error)
    }
  }, [userInfo])

  useEffect(() => {
    Promise.all([initRatchet(), getChatSession()]).then()
  }, [getChatSession])

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
