import { combineReducers } from 'redux'
import { quizReducer } from './quiz.reducer'
import { buildReducer } from './build.reducer'
import { authReducer } from './auth.reducer'

export default combineReducers({
  quiz: quizReducer,
  build: buildReducer,
  auth: authReducer
})
