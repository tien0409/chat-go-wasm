import UserList from './UserList'
import ConversationSearch from './ConversationSearch'

const Sidebar = () => {
  return (
    <div className="overflow-hidden h-full">
      <ConversationSearch />

      <UserList />
    </div>
  )
}

export default Sidebar
