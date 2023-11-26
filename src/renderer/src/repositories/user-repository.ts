import axiosInstance from '../libs/axios'

const userRepository = {
  searchUser: (search: string) => axiosInstance.get(`/user?search=${search}`)
}

export default userRepository
