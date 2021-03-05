// Utility to make axios requests
import request from '../utils/request'

// Login user
export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
