import axios from 'axios'

axios.defaults.headers = {
  'Content-Type': 'application/json',
}
axios.defaults.timeout = 10000
// axios.defaults.withCredentials = true
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 500
}

const defaultController = new AbortController()

axios.interceptors.request.use(
  async config => {
    // add request interceptors
    return config
  },
  error => {
    Promise.reject(error)
  }
)

const get = (url: string, params: object, cancelController?: AbortController) =>
  axios.get(url, {
    params,
    signal: cancelController ? cancelController.signal : defaultController.signal,
  })

const post = (url: string, params: object, cancelController?: AbortController) =>
  axios.post(url, {
    params,
    signal: cancelController ? cancelController.signal : defaultController.signal,
  })

const put = (url: string, params: object, cancelController?: AbortController) =>
  axios.put(url, {
    params,
    signal: cancelController ? cancelController.signal : defaultController.signal,
  })

const del = (url: string, params: object, cancelController?: AbortController) =>
  axios.delete(url, {
    params,
    signal: cancelController ? cancelController.signal : defaultController.signal,
  })

const wait = (time = 300) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`wait ${time} ms`)
    }, time)
  })
}

export { get, post, put, del, wait, defaultController as controller }
