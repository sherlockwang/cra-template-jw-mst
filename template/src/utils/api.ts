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

const get = (url: string, params: object) =>
  axios.get(url, {
    params,
  })

const post = (url: string, params: object) => axios.post(url, params)

const put = (url: string, params: object) => axios.put(url, params)

const del = (url: string, params: object) =>
  axios.delete(url, {
    params,
  })

export { get, post, put, del }
