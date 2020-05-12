import axios from 'axios'

export default axios.create({
  baseURL: 'https://pure-quiz-ec5e8.firebaseio.com'
})
