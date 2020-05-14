import {
  CREATE_QUIZ_QUESTION,
  ADD_QUIZ_START,
  ADD_QUIZ_SUCCESS,
  ADD_QUIZ_FAIL,
  RESET_QUIZ_CREATION
} from '../actions/actionTypes'

const initialState = {
  quiz: {
    theme: '',
    questions: []
  },
  uploading: false
}

export const buildReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUIZ_START:
      return {
        ...state,
        uploading: true
      }
    case ADD_QUIZ_SUCCESS:
      return {
        ...state,
        uploading: false
      }
    case ADD_QUIZ_FAIL:
      return {
        ...state,
        uploading: false,
        error: action.error
      }
    case CREATE_QUIZ_QUESTION:
      const theme = action.item.theme ? action.item.theme : state.quiz.theme
      return {
        ...state,
        quiz: {
          theme,
          questions: [...state.quiz.questions, action.item]
        }
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: {
          theme: '',
          questions: []
        }
      }
    default:
      return state
  }
}
