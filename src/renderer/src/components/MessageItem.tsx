import clsx from 'clsx'
import { File, Trash } from 'lucide-react'
import IMessage from '../interfaces/IMessage'
import { memo, useEffect, useState } from 'react'
import useAuthStore from '../stores/useAuthStore'
import { FILE_TYPE, IMAGE_TYPE, TEXT_TYPE, VIDEO_TYPE } from '../configs/consts'
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
  const [filename, setFileName] = useState('')
  const [fileSize, setFileSize] = useState(0)

  const isSender = message.sender === userInfo?.userName

  useEffect(() => {
    if (message.type !== TEXT_TYPE && message.filePath) {
      ;(async function () {
        const [randomKey, filePath, mimeType, filename, fileSize] = message.filePath!.split(':')
        const res = await uploadRepository.downloadFile(filePath!)
        const arrBuffer = await res.data.arrayBuffer()
        const imgB64 = await window.api.decryptblob(arrBuffer, randomKey, mimeType)
        const blob = b64toBlob(imgB64, mimeType)
        const url = URL.createObjectURL(blob)
        setContent(url)

        if (message.type === FILE_TYPE) {
          setFileName(filename)
          setFileSize(parseInt(fileSize))
        }
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
          {message.type === TEXT_TYPE && <p className="text-xs ">{content}</p>}
          {message.type === IMAGE_TYPE && <img src={content} className="object-cover" />}
          {message.type === VIDEO_TYPE && <video src={content} className="object-cover" controls />}
          {message.type === FILE_TYPE && (
            <a href={content} className="flex gap-x-4 max-w-[400px]">
              <File size={40} />
              <div className="flex flex-col">
                <span>{filename}</span>
                <span>{fileSize}Kb</span>
              </div>
            </a>
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
