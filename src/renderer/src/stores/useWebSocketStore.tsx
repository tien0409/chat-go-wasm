import { create } from 'zustand'
import useAuthStore from './useAuthStore'
import { SOCKET_URL } from '../configs/consts'

interface ISocketStoreType {
  websocket: WebSocket | null
  initWebSocket: () => void
}

const useWebSocketStore = create<ISocketStoreType>((setState, getState) => ({
  websocket: null,
  initWebSocket: () => {
    const WEB_SOCKET_URL = `${SOCKET_URL}/ws?authToken=${useAuthStore.getState().authToken}`

    if (WEB_SOCKET_URL && !getState().websocket) {
      const _websocket = new WebSocket(WEB_SOCKET_URL)

      _websocket.onopen = () => {
        console.log('connect rồi dm Luyện Đồng')
      }

      _websocket.onclose = () => {
        console.log('disconnected rồi dm Luyện Đồng')
      }

      setState({ websocket: _websocket })
    }
  }
}))

export default useWebSocketStore
