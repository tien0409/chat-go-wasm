import Input from '../components/Input'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SIGN_IN_PAGE } from '../configs/routes'
import { toast } from 'react-toastify'
import authRepository from '../repositories/auth-repository'

const SignUpScreen = () => {
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formValue.password !== formValue.confirmPassword) {
      toast.error('Mật khẩu không khớp')
      return
    }
    try {
      const res = await authRepository.register({
        username: formValue.username,
        password: formValue.password
      })
      console.log('res', res)
      // navigate(SIGN_IN_PAGE)
    } catch (error) {
      toast.error('Đăng ký thất bại')
      console.error('ERROR: ', error)
    }
  }

  return (
    <div className="fixed top-20 left-1/2 min-w-[500px] -translate-x-1/2">
      <div className="text-right">
        <span className="mr-4">Bạn đã có tài khoản?</span>
        <button
          className="border py-2 px-5 rounded border-gray-200"
          onClick={() => navigate(SIGN_IN_PAGE)}
        >
          Đăng nhập
        </button>
      </div>

      <h1 className="mb-3 mt-10 text-3xl font-bold">Chào mừng!</h1>
      <p className="mb-8 text-sm">
        <strong>Đăng ký </strong>
        <span className="text-gray-500">tài khoản ngay hôm nay</span>
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Username"
          value={formValue.username}
          onChange={(e) => setFormValue({ ...formValue, username: e.target.value })}
        />
        <Input
          placeholder="Password"
          value={formValue.password}
          onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
        />
        <Input
          placeholder="Confirm password"
          value={formValue.confirmPassword}
          onChange={(e) => setFormValue({ ...formValue, confirmPassword: e.target.value })}
        />
        <button
          className="bg-prim-100 text-white font-semibold w-full rounded py-3 mt-2 hover:bg-prim-100/90 duration-200"
          type="submit"
        >
          Đăng ký
        </button>
      </form>
    </div>
  )
}

export default SignUpScreen
