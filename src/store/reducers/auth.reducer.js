import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from '../actions/actionTypes'

const initialState = {
  token: null,
  processing: false,
  error: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        processing: true
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        processing: false,
        token: action.token
      }
    case AUTH_FAIL:
      return {
        ...state,
        processing: false,
        error: action.error
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}
