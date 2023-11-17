import { ReactNode, useEffect } from 'react'
import useSocketStore from '../stores/useSocketStore'

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { socket, initSocket } = useSocketStore()

  useEffect(() => {
    if (socket) return
    else initSocket()
  }, [socket, initSocket])

  return children
}

export default SocketProvider
