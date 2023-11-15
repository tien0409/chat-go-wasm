import { create } from 'zustand'

type IVideoCallStore = {
  typeCall: 'video' | 'audio' | null
  setTypeCall: (value: 'video' | 'audio' | null) => void
}

const useVideoCallStore = create<IVideoCallStore>((set) => ({
  typeCall: null,
  setTypeCall: (value: 'video' | 'audio' | null) => set((prev) => ({ ...prev, typeCall: value }),
}))

export default useVideoCallStore
