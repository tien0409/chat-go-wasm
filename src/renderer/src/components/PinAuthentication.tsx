import PinInput from 'react-pin-input'
import { FormEvent, ReactNode, useEffect, useState } from 'react'
import useAuthStore from '../stores/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { SIGN_IN_PAGE } from '../configs/routes'

const PinAuthentication = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const { signingIn, isAuth, setIsAuth } = useAuthStore()

  const [pinValue, setPinValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleComplete = (value: string) => {
    setPinValue(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (pinValue === '1234') setIsAuth(true)
    else setErrorMessage('Mã pin không đúng')
  }

  useEffect(() => {
    const readAuthFile = async () => {
      const data = await window.api.readAuthFile()
      if (data !== 'Auth' && !signingIn) {
        setErrorMessage('')
        navigate(SIGN_IN_PAGE)
      }
    }

    readAuthFile().then()
  }, [signingIn])

  return (
    <>
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

          <p className="text-red-500 mt-3">{errorMessage}</p>

          <button className="mt-8 bg-prim-100 text-white py-2 px-6 rounded" type="submit">
            Xác nhận
          </button>
        </form>
      )}
    </>
  )
}

export default PinAuthentication
