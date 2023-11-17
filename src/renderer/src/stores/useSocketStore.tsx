import ioClient, { Socket } from 'socket.io-client'
import { create } from 'zustand'

interface ISocketStoreType {
  socket: Socket | null
  initSocket: () => void
}

// TODO this socket client cannot apply
const SOCKET_URL = '127.0.0.1:7777'

const useSocketStore = create<ISocketStoreType>((setState, getState) => ({
  socket: null,
  initSocket: () => {
    if (SOCKET_URL && !getState().socket) {
      const _socket = ioClient(SOCKET_URL || '', {
        path: '/ws',
        extraHeaders: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDAyMTQ1OTk5ODcsImlhdCI6MTcwMDIxMjc5OTk4NywidHRsIjoxODAwMDAwLCJ1c2VySWQiOiIxNTM1MDg5Ny04MTcxLTExZWUtYmE1Yy0yZTNiNzA1OGUzODEifQ.7f2h8edtGX5rbD7k3cpBg8HAxMQ20heehXgcHcnPItI'
        }
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
