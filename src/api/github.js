// Utility to make axios requests
import request from '../utils/request'

// Search user
// q, per_page, page
// total_count, items[avatar_url, url, login, ]
export function getUsers (params) {
  return request({
    url: `/users`,
    method: 'get',
    params
  })
}

export function getUser (data) {
  return request({
    url: `/users/${data.login}`,
    method: 'get',
    params: data.params
  })
}