import Input from '../components/Input'
import { FormEvent } from 'react'

const SignUpScreen = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <div className="fixed top-20 left-1/2 min-w-[500px] -translate-x-1/2">
      <div className="text-right">
        <span className="mr-4">Bạn đã có tài khoản?</span>
        <button className="border py-2 px-5 rounded border-gray-200">Đăng nhập</button>
      </div>

      <h1 className="mb-3 mt-10 text-3xl font-bold">Chào mừng!</h1>
      <p className="mb-8 text-sm">
        <strong>Đăng ký </strong>
        <span className="text-gray-500">tài khoản ngay hôm nay</span>
      </p>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <Input placeholder="Confirm password" />
        <button
          className="bg-prim-100 text-white font-semibold w-full rounded py-3 mt-2 hover:bg-prim-100/90 duration-200"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpScreen
