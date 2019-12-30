import {
  CHANGE_CURRENT_CATEGORY,
  GET_FILMS_START,
  GET_FILMS_SUCCESS,
  GET_REVIEWS,
  GET_SINGLE_FILM_START,
  GET_SINGLE_FILM_SUCCESS
} from "./actionType";
import axios from "axios/index";

export const getFilms = () => async dispatch => {
  dispatch({
    type: GET_FILMS_START
  });
  const res = await axios.get('https://es31-server.appspot.com/wtw/films');
  dispatch({
    type: GET_FILMS_SUCCESS,
    payload: res.data
  })
};
export const getSingleFilm = id => async dispatch => {
  dispatch({
    type: GET_SINGLE_FILM_START
  });
  let res = await axios.get('https://es31-server.appspot.com/wtw/films');
  res = res.data.find(item => item.id === +id);
  dispatch({
    type: GET_SINGLE_FILM_SUCCESS,
    payload: res
  })
};


export const getReviews = id => async dispatch => {
  const res = await axios.get(`https://es31-server.appspot.com/wtw/comments/${id}`);
  dispatch({
    type: GET_REVIEWS,
    payload: res.data
  })
};

export const changeCurrentCategory = currentCategory => {
  return{
    type: CHANGE_CURRENT_CATEGORY,
    payload: currentCategory
  }
};