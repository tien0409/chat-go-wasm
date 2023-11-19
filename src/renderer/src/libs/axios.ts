import axios from 'axios'
import { ACCESS_TOKEN_KEY } from '../configs/consts'

const axiosInstance = axios.create({
  baseURL: 'http://165.232.174.21:7777/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem(ACCESS_TOKEN_KEY)
      ? `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
      : undefined
  }
})

export default axiosInstance
