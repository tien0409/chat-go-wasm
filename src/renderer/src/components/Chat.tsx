import MessageList from './MessageList'
import MessageForm from './MessageForm'
import MessageSearch from './MessageSearch'

const Chat = () => {
  return (
    <>
      <MessageSearch />

      <div className="pt-4 flex-1 mb-16 overflow-auto">
        <MessageList />
      </div>

      <div className="mt-5 absolute bottom-2 inset-x-0">
        <MessageForm />
      </div>
    </>
  )
}

export default Chat
