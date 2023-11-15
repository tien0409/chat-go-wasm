const UserItem = () => {
  return (
    <div className="border-b cursor-pointer flex gap-x-3 justify-between w-full p-3 items-center">
      <div className="flex gap-2 items-center flex-1 ">
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dcat&psig=AOvVaw1P10X_S6zG0RR70Hrkx6Ne&ust=1700143950368000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCNiMuPOXxoIDFQAAAAAdAAAAABAE"
          alt="image"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col overflow-hidden">
          <h4 className="font-semibold text-sm">Username</h4>
          <p className="line-clamp-1 text-xs text-gray-400">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Error, repellat?.
          </p>
        </div>
      </div>

      <span className="w-2 h-2 rounded-full bg-green-500"></span>
    </div>
  )
}

export default UserItem
