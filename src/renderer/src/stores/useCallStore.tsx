import { create } from 'zustand'
import { WS_CALL_URL } from '../configs/consts'

type CallStatus = 'calling' | 'receiving-call' | 'on-call' | 'idle'

type IVideoCallStore = {
  myWS: WebSocket | null
  initWS: (type: 'FROM_CALLER' | 'FROM_SENDER') => void
  voipToken: string | null
  setVoipToken: (value: string | null) => void
  status: CallStatus
  setStatus: (value: CallStatus) => void
  caller: string | null
  setCaller: (value: string | null) => void
  typeCall: 'video' | 'audio' | null
  setTypeCall: (value: 'video' | 'audio' | null) => void
  enableVideo: boolean
  setEnableVideo: (value: boolean) => void
  enableAudio: boolean
  setEnableAudio: (value: boolean) => void
  turnOffCall: () => void
}

const useCallStore = create<IVideoCallStore>((set, getState) => ({
  myWS: null,
  initWS: (type: 'FROM_CALLER' | 'FROM_SENDER') => {
    console.log('type', type)
    console.log('get()', getState())
    const ws = new WebSocket(
      WS_CALL_URL.replace('{{voipToken}}', getState().voipToken!).replace('{{connType}}', type)
    )
    console.log('ws', ws)
    set(() => ({ myWS: ws }))
    ws.onopen = () => {
      console.log('SenderVOIP Connected')
    }
  },
  voipToken: null,
  setVoipToken: (value: string | null) => set(() => ({ voipToken: value })),
  status: 'idle',
  setStatus: (value: CallStatus) => set(() => ({ status: value })),
  caller: null,
  setCaller: (value: string | null) => set(() => ({ caller: value })),
  typeCall: null,
  setTypeCall: (value: 'video' | 'audio' | null) => set(() => ({ typeCall: value })),
  enableAudio: false,
  setEnableAudio: (value: boolean) => set(() => ({ enableAudio: value })),
  enableVideo: false,
  setEnableVideo: (value: boolean) => set(() => ({ enableVideo: value })),
  turnOffCall: () => set(() => ({ typeCall: null, enableAudio: false, enableVideo: false }))
}))

export default useCallStore
