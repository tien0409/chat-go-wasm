import PinInput from 'react-pin-input'
import { useCallback, FormEvent, ReactNode, useEffect, useState } from 'react'
import useAuthStore from '../stores/useAuthStore'
import SocketProvider from '../providers/SocketProvider'
import { useNavigate } from 'react-router-dom'
import { SIGN_IN_PAGE } from '../configs/routes'
import { ACCESS_TOKEN_KEY } from '../configs/consts'
import authRepository from '../repositories/auth-repository'
import { Loader2 } from 'lucide-react'

const PinAuthentication = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const { isAuth, userInfo, setAuthToken, setUserInfo, setIsAuth } = useAuthStore()

  const [pinValue, setPinValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isInit, setIsInit] = useState(true)

  const handleComplete = (value: string) => {
    setPinValue(value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await window.startUp(pinValue)
      const keyBundle = await window.generateInternalKeyBundle()
      const externalKeyBundle = await window.populateExternalKeyBundle()
      await authRepository.uploadExternalKey(externalKeyBundle)
      const keyJSON = await window.saveInternalKey(keyBundle)
      console.log('keyJSON', keyJSON)
      const pinValid = await window.api.checkAuthFile(JSON.stringify(keyJSON))
      setIsAuth(pinValid)

      if (!pinValid) {
        setErrorMessage('Mã pin không đúng')
      } else {
        setErrorMessage('')
      }
    } catch (error) {
      console.error('ERROR', error)
    }
  }

  const autoSignIn = useCallback(async () => {
    const isExistAuthFile = await window.api.existAuthFile()
    if (!isExistAuthFile) {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      navigate(SIGN_IN_PAGE)
    }

    if (localStorage.getItem(ACCESS_TOKEN_KEY) && !userInfo) {
      try {
        const [userInfoRes, authToken] = await Promise.all([
          authRepository.getUserInfo(),
          authRepository.getAuthToken()
        ])

        await window.startUp('1234')
        const internalKey = await window.api.getInternalKey()
        console.log('internalKey', internalKey)
        if (internalKey) {
          const res = await window.loadInternalKey(JSON.parse(internalKey))
          console.log('res', res)
        }

        setAuthToken(authToken.data.authToken)
        setUserInfo(userInfoRes.data)
        setIsAuth(true)
      } catch (error) {
        navigate(SIGN_IN_PAGE)
      }
    } else if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      navigate(SIGN_IN_PAGE)
    }
    setIsInit(false)
  }, [userInfo])

  useEffect(() => {
    autoSignIn()
  }, [autoSignIn])

  return isInit ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader2 className=" animate-spin w-24 h-24" />
    </div>
  ) : (
    <SocketProvider>
      {isAuth ? (
        children
      ) : (
        <form
          className="fixed left-1/2 text-center top-1/4 -translate-x-1/2"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-8 text-3xl font-bold">Vui lòng nhập mã pin</h2>

          <PinInput
            length={4}
            initialValue=""
            focus
            inputStyle={{
              borderRadius: 4,
              margin: '0 10px'
            }}
            onComplete={handleComplete}
          />
          {errorMessage && <p className="text-red-500 mt-6">{errorMessage}</p>}

          <button className="mt-8 bg-prim-100 text-white py-2 px-6 rounded" type="submit">
            Xác nhận
          </button>
        </form>
      )}
    </SocketProvider>
  )
}

export default PinAuthentication
