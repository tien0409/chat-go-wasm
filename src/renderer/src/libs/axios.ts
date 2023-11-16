import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://165.232.174.21:7777/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
