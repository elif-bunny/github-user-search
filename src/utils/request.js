import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  headers: {
    'Accept': 'vnd.github.v3+json'
  },
  baseURL: 'https://api.github.com'
})

// request interceptor
service.interceptors.request.use(
  config => config,
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 500) {
      Message({
        message: 'There was an error with your request. Please try again shortly',
        type: 'error',
        customClass: 'error-message'
      })
    }

    Message({
      message: error.response.data.message,
      type: 'error',
      customClass: 'error-message'
    })

    return Promise.reject(error)
  }
)

export default service