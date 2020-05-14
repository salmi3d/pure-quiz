import axios from '../../utils/axios'
import {
  FETCH_QUiZZES_START,
  FETCH_QUiZZES_SUCCESS,
  FETCH_QUiZZES_FAIL,
  FETCH_QUiZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from './actionTypes'

const isQuizFinished = state => state.activeQuestion + 1 === state.quiz.length

export const fetchQuizzes = () => async dispatch => {
  dispatch(fetchQuizzesStart())
  try {
    const response = await axios.get('/quizzes.json')
    const quizzes = []
    Object.keys(response.data).forEach((key, idx) => {
      quizzes.push({
        id: key,
        name: `Quiz #${idx + 1}`
      })
    })
    dispatch(fetchQuizzesSuccess(quizzes))
  } catch (e) {
    dispatch(fetchQuizzesFail(e))
  }
}

export const fetchQuizById = id => async dispatch => {
  dispatch(fetchQuizzesStart())
  try {
    const response = await axios.get(`/quizzes/${id}.json`)
    const quiz = response.data
    dispatch(fetchQuizSuccess(quiz))
  } catch (e) {
    dispatch(fetchQuizzesFail(e))
  }
}

export const fetchQuizzesStart = () => ({
  type: FETCH_QUiZZES_START
})

export const fetchQuizzesSuccess = quizzes => ({
  type: FETCH_QUiZZES_SUCCESS,
  quizzes
})

export const fetchQuizzesFail = error => ({
  type: FETCH_QUiZZES_FAIL,
  error
})

export const fetchQuizSuccess = quiz => ({
  type: FETCH_QUiZ_SUCCESS,
  quiz
})

export const quizSetState = (answerState, results) => ({
  type: QUIZ_SET_STATE,
  answerState,
  results
})

export const finishQuiz = () => ({
  type: FINISH_QUIZ
})

export const quizNextQuestion = number => ({
  type: QUIZ_NEXT_QUESTION,
  number
})

export const retryQuiz = () => ({
  type: QUIZ_RETRY
})

export const quizAnswerClick = answerId => (dispatch, getState) => {
  const state = getState().quiz
  if (state.answerState) {
    const key = Object.keys(state.answerState)[0]
    if (state.answerState[key] === 'success') return
  }
  const question = state.quiz[state.activeQuestion]
  const results = state.results
  if (question.rightAnswerId === answerId) {
    if (!results[question.id]) {
      results[question.id] = 'success'
    }

    dispatch(quizSetState({ [answerId]: 'success' }, results))

    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz())
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1))
      }
      window.clearTimeout(timeout)
    }, 500)
  } else {
    results[question.id] = 'fail'
    dispatch(quizSetState({ [answerId]: 'fail' }, results))
  }
}

