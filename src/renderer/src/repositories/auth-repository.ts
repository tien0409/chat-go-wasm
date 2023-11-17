import axiosInstance from '../libs/axios'
import IAuthData from '../interfaces/IAuthData'
import ILoginResponse from '../interfaces/ILoginResponse'
import IResponse from '../interfaces/IResponse'

const authRepository = {
  getUserInfo: (accessToken: string) =>
    axiosInstance.get('/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }),
  login: (data: IAuthData): Promise<IResponse<ILoginResponse>> =>
    axiosInstance.post('/auth/login', { ...data, loginType: 'password' }),
  register: (data: IAuthData) => axiosInstance.post('/auth/register', data)
}

export default authRepository
