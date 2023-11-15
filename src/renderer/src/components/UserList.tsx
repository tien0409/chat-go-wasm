import UserItem from './UserItem'

const UserList = () => {
  return (
    <div className="flex flex-col mt-10">
      {Array(5)
        .fill(0)
        .map((_x, index) => (
          <UserItem key={index} />
        ))}
    </div>
  )
}

export default UserList
