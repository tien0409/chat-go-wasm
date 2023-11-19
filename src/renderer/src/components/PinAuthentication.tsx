import PinInput from 'react-pin-input'
import { FormEvent, ReactNode, useEffect, useState } from 'react'
import useAuthStore from '../stores/useAuthStore'
import SocketProvider from '../providers/SocketProvider'
import { useNavigate } from 'react-router-dom'
import { SIGN_IN_PAGE } from '../configs/routes'

const PinAuthentication = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const { userInfo, authToken, setIsAuth } = useAuthStore()

  const [pinValue, setPinValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleComplete = (value: string) => {
    setPinValue(value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await window.startUp(pinValue)
    const keyBundle = await window.generateInternalKeyBundle()
    const keyJSON = await window.saveInternalKey(keyBundle)
    const pinValid = await window.api.checkAuthFile(keyJSON.toString())
    setIsAuth(pinValid)

    if (!pinValid) {
      setErrorMessage('Mã pin không đúng')
    } else {
      setErrorMessage('')
    }
  }

  useEffect(() => {
    if (!userInfo) navigate(SIGN_IN_PAGE)
  }, [userInfo])

  // useEffect(() => {
  //   const readAuthFile = async () => {
  //     const data = await window.api.readAuthFile()
  //     if (data !== 'Auth' && !signingIn) {
  //       navigate(SIGN_IN_PAGE)
  //     }
  //   }
  //
  //   readAuthFile().then()
  // }, [signingIn])

  return (
    <SocketProvider>
      {authToken ? (
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
