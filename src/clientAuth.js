import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:3001'

const clientAuth = {
  setTokenHeader: () => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
    }
  },
  signUp: (userCredentials) =>{
    return axios({
      url: '/api/users',
      method: 'post',
      data: userCredentials
    })
  },
  logIn: (userCredentials) => {
    return axios({
      url: '/api/users/login',
      method: 'post',
      data: userCredentials
    })
    .then(res => {
      if(res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },
  // this is used to set the current user in the App.js main component's state, based on the presence of a token.
  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    return token ? jwt_decode(token) : null
  },
  logOut: () => {
    return new Promise((resolve) => {
    localStorage.clear()
    delete axios.defaults.headers.common['x-access-token']
    resolve("bye.")
    })
  },
  getPosts: () => {
    return axios({
      url: '/api/posts',
      method: 'get'
    })
  },
  addPost: (newPost) => {
    return axios({
      url: '/api/posts',
      method: 'post',
      data: newPost
    })
  },
  deletePost: (id) =>{
    return axios({
      url: `/api/posts/${id}`,
      method: 'delete'
    })
  },
  updatePost: (updatedPost,id) => {
    return axios({
      url: `/api/posts/${id}`,
      method: 'patch',
      data: updatedPost
    })
  },
  getAllPosts: () => {
  return axios({
    url: '/api/posts/all',
    method: 'get'
    })
  }
}

clientAuth.setTokenHeader()

export default clientAuth
