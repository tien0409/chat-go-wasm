import axiosInstance from '../libs/axios'

const userRepository = {
  searchUser: (search: string) => axiosInstance.get(`/user/search?keyWord=${search}`),
  getExternalUserKey: (userId: string) => axiosInstance.get(`/user/${userId}/externalKey`)
}

export default userRepository
