import Input from '../components/Input'
import { FormEvent } from 'react'
import useAuthStore from '../stores/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { HOME_PAGE, SIGN_UP_PAGE } from '../configs/routes'

const SignInScreen = () => {
  const navigate = useNavigate()

  const { setIsAuth } = useAuthStore()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsAuth(true)
    navigate(HOME_PAGE)
  }

  return (
    <div className="fixed top-20 left-1/2 min-w-[500px] -translate-x-1/2">
      <div className="text-right">
        <span className="mr-4">Bạn chưa có tài khoản?</span>
        <button
          className="border py-2 px-5 rounded border-gray-200"
          onClick={() => navigate(SIGN_UP_PAGE)}
        >
          Đăng ký
        </button>
      </div>

      <h1 className="mb-3 mt-10 text-3xl font-bold">Chào mừng!</h1>
      <p className="mb-8 text-sm">
        <strong>Đăng nhập </strong>
        <span className="text-gray-500">để trải nghiệm những nội dung thú vị</span>
      </p>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <button
          className="bg-prim-100 text-white font-semibold w-full rounded py-3 mt-2 hover:bg-prim-100/90 duration-200"
          type="submit"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  )
}

export default SignInScreen
