import axios from 'axios'

export function get (url, params = {}) {
  return request('get', url, {}, params)
}

function request (method, url, data = {}, params = {}) {
  return axios({url, data, method, params})
}
