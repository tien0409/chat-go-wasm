import { ReactNode, useEffect } from 'react'
import useWebSocketStore from '../stores/useWebSocketStore'
import useAuthStore from '../stores/useAuthStore'

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { userInfo, authToken } = useAuthStore()
  const { websocket, initWebSocket } = useWebSocketStore()

  useEffect(() => {
    if (websocket || !authToken) return
    else initWebSocket()
  }, [websocket, initWebSocket, userInfo, authToken])

  return children
}

export default SocketProvider
