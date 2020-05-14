import {
  CREATE_QUIZ_QUESTION,
  ADD_QUIZ_START,
  ADD_QUIZ_SUCCESS,
  ADD_QUIZ_FAIL,
  RESET_QUIZ_CREATION
} from '../actions/actionTypes'

const initialState = {
  quiz: [],
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
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: []
      }
    default:
      return state
  }
}
