const MessageItem = () => {
  return (
    <div className="flex gap-x-3 items-start">
      <img
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dcat&psig=AOvVaw1P10X_S6zG0RR70Hrkx6Ne&ust=1700143950368000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCNiMuPOXxoIDFQAAAAAdAAAAABAE"
        alt="image"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col">
        <h4 className="font-semibold text-sm">Username</h4>
        <p className="text-xs text-gray-400">
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Error, repellat?. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
          doloremque laborum non quas repudiandae sed soluta. Architecto eius id quos.
        </p>
      </div>
    </div>
  )
}

export default MessageItem
