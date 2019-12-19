import {
  CHANGE_CURRENT_CATEGORY,
  GET_FILMS_START,
  GET_FILMS_SUCCESS, GET_REVIEWS,
  GET_SINGLE_FILM_START,
  GET_SINGLE_FILM_SUCCESS
} from "../actions/actionType";

const initialState = {
  films: [],
  film: [],
  reviews: [],
  categoriesInd: [],
  currentCategory: 'All',
};

const films = (state = initialState, action) => {
  switch (action.type){
    case GET_FILMS_START:
      return {
        ...state,
        loading: true
      };
    case GET_FILMS_SUCCESS:
      return {
        ...state,
        films: action.payload,
        categoriesInd: Array.from(new Set(action.payload.map(item => item.genre))),
        loading: false
      };
    case GET_SINGLE_FILM_START:
      return {
        ...state,
        loading: true
      };
    case GET_SINGLE_FILM_SUCCESS:
      return {
        ...state,
        film: action.payload,
        loading: false
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    case CHANGE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      };

    default:
      return state
  }
};

export default films