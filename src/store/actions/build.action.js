import axios from '../../utils/axios'
import {
  CREATE_QUIZ_QUESTION,
  ADD_QUIZ_START,
  ADD_QUIZ_SUCCESS,
  FETCH_QUiZZES_FAIL,
  RESET_QUIZ_CREATION
} from './actionTypes'

export const createQuizQuestion = item => ({
  type: CREATE_QUIZ_QUESTION,
  item
})

export const resetQuizCreation = () => ({
  type: RESET_QUIZ_CREATION
})

export const createQuiz = () => async (dispatch, getState) => {
  dispatch(addQuizStart())
  try {
    await axios.post('/quizzes.json', getState().build.quiz)
    dispatch(resetQuizCreation())
    dispatch(addQuizSuccess())
  } catch (e) {
    dispatch(addQuizFail(e))
  }
}

export const addQuizStart = () => ({
  type: ADD_QUIZ_START
})

export const addQuizSuccess = () => ({
  type: ADD_QUIZ_SUCCESS
})

export const addQuizFail = error => ({
  type: FETCH_QUiZZES_FAIL,
  error
})
