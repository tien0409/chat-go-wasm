import HomeScreen from './screens/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
