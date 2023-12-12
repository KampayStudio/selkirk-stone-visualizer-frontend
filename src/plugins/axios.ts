import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://ff57-136-158-64-212.ngrok-free.app/api',

  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('authToken')

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header directly with the token string
    config.headers.Authorization = `Bearer ${token}`
  }

  // Return modified config
  return config
})

export default axiosIns
