import { create } from 'zustand'

interface IWasmStore {
  wasmMod: any
  setWasmMod: (wasm: any) => void
  wasmInst: any
  setWasmInst: (wasm: any) => void
}

const useWasmStore = create<IWasmStore>((set) => ({
  wasmInst: null,
  setWasmInst: (wasm) => set({ wasm }),
  wasmMod: null,
  setWasmMod: (wasm) => set({ wasm })
}))

export default useWasmStore
