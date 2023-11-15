const UserItem = () => {
  return (
    <div className="border cursor-pointer flex gap-x-4 justify-between">
      <div className="flex gap-2 items-center">
        <img src="abc" alt="image" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col overflow-hidden">
          <h4>Username</h4>
          <p className="truncate">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Error, repellat?.
          </p>
        </div>
      </div>

      <div>off</div>
    </div>
  )
}

export default UserItem
