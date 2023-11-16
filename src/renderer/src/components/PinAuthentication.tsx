import PinInput from 'react-pin-input'
import { FormEvent, ReactNode, useState } from 'react'
import useAuthStore from '../stores/useAuthStore'

const PinAuthentication = ({ children }: { children: ReactNode }) => {
  const { isAuth, setIsAuth } = useAuthStore()

  const [pinValue, setPinValue] = useState('')

  const handleComplete = (value: string) => {
    setPinValue(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsAuth(true)
  }

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
            inputStyle={{
              borderRadius: 4,
              margin: '0 10px'
            }}
            onComplete={handleComplete}
          />

          <button className="mt-8 bg-prim-100 text-white py-2 px-6 rounded" type="submit">
            Xác nhận
          </button>
        </form>
      )}
    </>
  )
}

export default PinAuthentication
