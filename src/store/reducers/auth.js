import {CLEAR_ERROR, LOGIN_ERROR, LOGOUT_USER, SET_USER} from "../actions/actionType";

const initialState = {
  user: null,
  error: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_USER:
      return {
        ...state,
        user: action.user,
        error: false
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: false
      };

    default:
      return state
  }
};

export default authReducer