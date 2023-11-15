import clsx from 'clsx'
import { Trash } from 'lucide-react'
import IMessage from '../interfaces/IMessage'
import { memo } from 'react'

type MessageItemProps = {
  message: IMessage
}

const MessageItem = (props: MessageItemProps) => {
  const { message } = props

  const isSender = Math.random() > 0.5

  return (
    <div className={clsx('flex gap-x-3 group', isSender ? 'flex-row-reverse' : 'items-start')}>
      <img
        src="https://source.unsplash.com/RZrIJ8C0860"
        alt="image"
        className="w-10 h-10 rounded-full"
      />
      <div className={clsx('flex items-center gap-x-4', isSender && 'flex-row-reverse')}>
        <div
          className={clsx(
            'flex flex-col rounded p-2',
            isSender ? 'bg-[#2A5251] text-white' : 'bg-[#F3F2EE]'
          )}
        >
          <p className="text-xs ">{message.content}</p>
        </div>

        <div className="opacity-0 group-hover:opacity-100 duration-200">
          {isSender && <Trash className="cursor-pointer" size={14} />}
        </div>
      </div>
    </div>
  )
}

export default memo(MessageItem)
