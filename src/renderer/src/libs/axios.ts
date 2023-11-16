import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://165.232.174.21:7777',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
