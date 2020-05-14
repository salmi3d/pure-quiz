import {
  FETCH_QUiZZES_START,
  FETCH_QUiZZES_SUCCESS,
  FETCH_QUiZZES_FAIL,
  FETCH_QUiZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from '../actions/actionTypes'

const initialState = {
  quizzes: [],
  loading: false,
  error: null,
  results: {},
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  quiz: null
}

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUiZZES_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUiZZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: action.quizzes
      }
    case FETCH_QUiZZES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case FETCH_QUiZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number
      }
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
      }
    default:
      return state
  }
}
