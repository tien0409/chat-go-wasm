import SignInScreen from './screens/SignIn'
import WasmProvider from './provioders/WasmProvider'

const App = () => {
  return (
    <WasmProvider>
      <SignInScreen />
    </WasmProvider>
  )
}

export default App
