import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // timeout: 5000, // request timeout,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.baseURL = '/api/v1'
    const token = document.head.querySelector('meta[name="csrf-token"]')

    if (token) {
      config.headers.common['X-CSRF-TOKEN'] = token.content
    } else {
      console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
    }

    // Retrieve the bearer token from localStorage
    const bearer = localStorage.getItem('cce-token')

    if (bearer) {
      config.headers.common['Authorization'] = `Bearer ${bearer}`
    }

    return config
  },
  error => {
    // Do something with request error
    console.log(error.response)
    console.log('// Do something with request error')
    console.log(error) // for debug
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