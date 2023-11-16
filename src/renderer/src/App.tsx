import HomeScreen from './screens/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HOME_PAGE, SIGN_IN_PAGE, SIGN_UP_PAGE } from './configs/routes'
import SignInScreen from './screens/SignIn'
import SignUpScreen from './screens/SignUp'
import PinAuthentication from './components/PinAuthentication'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={HOME_PAGE}
          element={
            <PinAuthentication>
              <HomeScreen />
            </PinAuthentication>
          }
        />
        <Route path={SIGN_IN_PAGE} element={<SignInScreen />} />
        <Route path={SIGN_UP_PAGE} element={<SignUpScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
