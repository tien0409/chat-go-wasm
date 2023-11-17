import ioClient, { Socket } from 'socket.io-client'
import { create } from 'zustand'

interface ISocketStoreType {
  socket: Socket | null
  initSocket: () => void
}

const SOCKET_URL = 'https://165.232.174.21:7777/ws'

const useSocketStore = create<ISocketStoreType>((setState, getState) => ({
  socket: null,
  initSocket: () => {
    if (SOCKET_URL && !getState().socket) {
      const _socket = ioClient(SOCKET_URL || '', {
        withCredentials: true
      })

      _socket.on('connect', () => {
        console.log('connect rồi dm Luyện Đồng')
      })

      _socket.on('disconnect', () => {
        console.log('disconnected rồi dm Luyện Đồng')
      })

      setState({ socket: _socket })
    }
  }
}))

export default useSocketStore
