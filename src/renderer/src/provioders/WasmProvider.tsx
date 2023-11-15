import { ReactNode, useEffect, useState } from 'react'
import { readFile } from 'fs'

const WasmProvider = ({ children }: { children: ReactNode }) => {
  const [wasmModule, setWasmModule] = useState<WebAssembly.Module | null>(null)
  const [wasmInstance, setWasmInstance] = useState<WebAssembly.Instance | null>(null)

  const initWasm = async () => {
    const { instance, module } = await WebAssembly.instantiateStreaming(
      fetch('main.wasm'),
      window.go.importObject
    )
    await window.go.run(instance)
    console.log('instance', instance)
    console.log('module', module)
    setWasmModule(module)
    setWasmInstance(instance)
  }

  useEffect(() => {
    initWasm()
  }, [])

  return children
}

export default WasmProvider
