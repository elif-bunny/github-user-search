// Utility to make axios requests
import request from '../utils/request'

// Search user
// q, per_page, page
// total_count, items[avatar_url, url, login, ]
export function getUsers (params) {
  return request({
    url: `/search/users`,
    method: 'get',
    params
  })
}

export function getUser (data) {
  return request({
    url: `/users/${data}`,
    method: 'get'
  })
}