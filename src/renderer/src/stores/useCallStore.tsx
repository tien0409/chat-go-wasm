import { create } from 'zustand'

type IVideoCallStore = {
  typeCall: 'video' | 'audio' | null
  setTypeCall: (value: 'video' | 'audio' | null) => void
  enableVideo: boolean
  setEnableVideo: (value: boolean) => void
  enableAudio: boolean
  setEnableAudio: (value: boolean) => void
  turnOffCall: () => void
}

const useCallStore = create<IVideoCallStore>((set) => ({
  typeCall: null,
  setTypeCall: (value: 'video' | 'audio' | null) => set(() => ({ typeCall: value })),
  enableAudio: false,
  setEnableAudio: (value: boolean) => set(() => ({ enableAudio: value })),
  enableVideo: false,
  setEnableVideo: (value: boolean) => set(() => ({ enableVideo: value })),
  turnOffCall: () => set(() => ({ typeCall: null, enableAudio: false, enableVideo: false }))
}))

export default useCallStore
