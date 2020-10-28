import axios from 'axios'

axios.defaults.headers = {
  'Content-Type': 'application/json',
}
axios.defaults.timeout = 10000
// axios.defaults.withCredentials = true
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 500
}

axios.interceptors.request.use(
  async config => {
    // add request interceptors
    return config
  },
  error => {
    Promise.reject(error)
  }
)

const get = (url, params) =>
  axios.get(url, {
    params,
  })

const post = (url, params) => axios.post(url, params)

const put = (url, params) => axios.put(url, params)

const del = (url, params) =>
  axios.delete(url, {
    params,
  })

export { get, post, put, del }
