import Input from './Input'
import { Paperclip, SendHorizonal } from 'lucide-react'
import { FormEvent, useRef, useState } from 'react'
import useConversationStore from '../stores/useConversationStore'
import useWebSocketStore from '../stores/useWebSocketStore'
import useAuthStore from '../stores/useAuthStore'
import { FILE_TYPE, TEXT_TYPE } from '../configs/consts'
import uploadRepository from '../repositories/upload-repository'
import { b64toBlob } from '../utils'

type MessageFormProps = {
  handleScroll: (content: string) => void
}

const MessageForm = (props: MessageFormProps) => {
  const { handleScroll } = props

  const {
    messages,
    setConversations,
    setMessages,
    currentRatchetId,
    currentConversation,
    conversations
  } = useConversationStore()
  const { websocket } = useWebSocketStore()
  const { userInfo } = useAuthStore()

  const inputRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = content.trim()
    if (!value) return

    const res = await window.sendMessage(currentRatchetId!, false, content)
    websocket?.send(
      JSON.stringify({
        type: TEXT_TYPE,
        senderUsername: userInfo?.userName,
        plainMessage: '',
        chatSessionId: currentRatchetId,
        index: res.index,
        cipherMessage: res.cipherMessage,
        isBinary: res.isBinary
      })
    )
    const newMessage = {
      index: res.index,
      content: value,
      type: TEXT_TYPE,
      sender: userInfo!.userName
    }

    await window.api.addMessageToRatchet(currentConversation!, [newMessage])

    setMessages([...messages, newMessage])

    const conversationIndex = conversations.findIndex(
      (item) => item.receiver === currentConversation
    )
    const newConversations = [...conversations]
    newConversations[conversationIndex].lastMessage = value
    const temp = newConversations[conversationIndex]
    newConversations.splice(conversationIndex, 1)
    newConversations.unshift(temp)
    setConversations(newConversations)

    setContent('')
    handleScroll(value)
  }

  const handleSendFile = async (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (!file) return
    const mimeType = file.type
    const randomKey = await window.api.random32Bytes()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const encryptedBase64 = await window.api.encryptblob(
        e!.target!.result as ArrayBuffer,
        randomKey,
        mimeType
      )
      const encryptedBlob = b64toBlob(encryptedBase64, mimeType)

      const formData = new FormData()
      formData.set('upload', encryptedBlob)
      const res = await uploadRepository.uploadFile(formData)

      const resMsg = await window.sendMessage(currentRatchetId!, true, randomKey)
      websocket?.send(
        JSON.stringify({
          type: FILE_TYPE,
          senderUsername: userInfo?.userName,
          plainMessage: res.data.filePath,
          chatSessionId: currentRatchetId,
          index: resMsg.index,
          cipherMessage: resMsg.cipherMessage,
          isBinary: true
        })
      )
      const newMessage = {
        index: resMsg.index,
        content: randomKey,
        filePath: res.data.filePath + ':' + mimeType,
        type: FILE_TYPE,
        sender: userInfo!.userName
      }

      await window.api.addMessageToRatchet(currentConversation!, [newMessage])

      setMessages([...messages, newMessage])

      const conversationIndex = conversations.findIndex(
        (item) => item.receiver === currentConversation
      )
      const newConversations = [...conversations]
      newConversations[conversationIndex].lastMessage = file.name
      const temp = newConversations[conversationIndex]
      newConversations.splice(conversationIndex, 1)
      newConversations.unshift(temp)
      setConversations(newConversations)

      setContent('')
      handleScroll(res.data.filePath)
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <form className="flex relative h-full px-4" onSubmit={handleSubmit}>
      <Input
        wrapperClass="h-full w-full"
        inputClass="pr-20"
        placeholder="Enter message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input ref={inputRef} type="file" hidden onChange={handleSendFile} />
      <Paperclip
        className="absolute -translate-y-1/2 top-1/2 right-14 cursor-pointer"
        onClick={() => {
          inputRef.current?.click()
        }}
      />
      <SendHorizonal className="absolute -translate-y-1/2 top-1/2 right-6 cursor-pointer" />

      <button type="submit" hidden>
        submit
      </button>
    </form>
  )
}

export default MessageForm
