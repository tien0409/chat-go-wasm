import clsx from 'clsx'
import { Trash } from 'lucide-react'
import IMessage from '../interfaces/IMessage'
import { memo, useEffect, useState } from 'react'
import useAuthStore from '../stores/useAuthStore'
import { FILE_TYPE, TEXT_TYPE } from '../configs/consts'
import { b64toBlob } from '../utils'
import uploadRepository from '../repositories/upload-repository'

type MessageItemProps = {
  message: IMessage
}

const MessageItem = (props: MessageItemProps) => {
  const { message } = props

  const { userInfo } = useAuthStore()
  const [content, setContent] = useState(
    message.type === TEXT_TYPE ? message.content : 'loading...'
  )

  const isSender = message.sender === userInfo?.userName

  useEffect(() => {
    if (message.type === FILE_TYPE && message.filePath) {
      ;(async function () {
        const [filePath, mimeType] = message.filePath!.split(':')
        const res = await uploadRepository.downloadFile(filePath!)
        const arrBuffer = await res.data.arrayBuffer()
        const imgB64 = await window.api.decryptblob(arrBuffer, message.content, mimeType)
        const blob = b64toBlob(imgB64, mimeType)
        const url = window.URL.createObjectURL(blob)
        setContent(url)
      })()
    }
  }, [message])

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
          {message.type === TEXT_TYPE ? (
            <p className="text-xs ">{content}</p>
          ) : (
            <img src={content} className="object-cover" />
          )}
        </div>

        <div className="opacity-0 group-hover:opacity-100 duration-200">
          {isSender && <Trash className="cursor-pointer" size={14} />}
        </div>
      </div>
    </div>
  )
}

export default memo(MessageItem)
