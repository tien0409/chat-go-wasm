import UserItem from './UserItem'

const UserList = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
      {Array(25)
        .fill(0)
        .map((_x, index) => (
          <UserItem key={index} />
        ))}
    </div>
  )
}

export default UserList
