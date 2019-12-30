import {ADD_TO_MY_LIST, LOGIN_ERROR, LOGOUT_USER, REMOVE_FROM_MY_LIST, SET_USER} from "../actions/actionType";

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

    case ADD_TO_MY_LIST:
      return {
        ...state,
        user: {...state.user, is_favourite: state.user.is_favourite ? [...state.user.is_favourite ,action.payload] : [action.payload]}
      };
    case REMOVE_FROM_MY_LIST:
      state.user.is_favourite.splice(action.payload, 1);
      return {
        ...state,
        user: {...state.user}
      };


    default:
      return state
  }
};

export default authReducer