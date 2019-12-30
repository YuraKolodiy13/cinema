import axios from 'axios'
import {ADD_TO_MY_LIST, LOGIN_ERROR, LOGOUT_USER, REMOVE_FROM_MY_LIST, SET_USER} from "./actionType";

export const auth = (email, password, isLogin, name) => {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCSVEXzwXCkdJHJ_96pD1Zg38jtFvduxvk';

    if(isLogin){
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCSVEXzwXCkdJHJ_96pD1Zg38jtFvduxvk';
    }

    try {
      const response = await axios.post(url, authData);
      const data = response.data;

      let user = {
        name: name,
        email: data.email,
        token: data.idToken,
        id: data.localId,
        is_favourite: []
      };
      if(isLogin){
        let res = await axios.get('https://cinema-a31fc.firebaseio.com/users.json');
        user = Object.values(res.data).find(item => item.id === data.localId);
        if(user.is_favourite){
          user.is_favourite = Object.values(user.is_favourite)
        }
      }
      if(!isLogin){
        try{
          await axios.post('https://cinema-a31fc.firebaseio.com/users.json', user);

        }catch (e) {
          console.log(e)
        }
      }

      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(authSuccess(user));
      // dispatch(autoLogout(data.expiresIn))
    }catch (e) {
      dispatch({
        type: LOGIN_ERROR,
        error: e.response.data
      })
    }

  }
};

export const authSuccess = (user) => {
  return{
    type: SET_USER,
    user
  }
};

export const autoLogin = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      dispatch(logout());
    }else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date()){
        dispatch(logout())
      }else {
        dispatch(authSuccess(user));
        // dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('expirationDate');
  return{
    type: LOGOUT_USER
  }
};

export const addToMYList = item => async dispatch => {
  let res = await axios.get('https://cinema-a31fc.firebaseio.com/users.json');
  let currentUser = JSON.parse(localStorage.getItem('user'));
  let userId = Object.entries(res.data).find(item => item[1].id === currentUser.id);
  await axios.post(`https://cinema-a31fc.firebaseio.com/users/${userId[0]}/is_favourite.json`, item);
  currentUser.is_favourite = currentUser.is_favourite ? [...currentUser.is_favourite, item] : [item];
  localStorage.setItem('user', JSON.stringify(currentUser));
  dispatch({
    type: ADD_TO_MY_LIST,
    payload: item
  })
};

export const removeFromMYList = item => async dispatch => {
  console.log(543)
  let res = await axios.get('https://cinema-a31fc.firebaseio.com/users.json');
  let currentUser = JSON.parse(localStorage.getItem('user'));
  let userId = Object.entries(res.data).find(item => item[1].id === currentUser.id);
  let list = await axios.get(`https://cinema-a31fc.firebaseio.com/users/${userId[0]}/is_favourite.json`);
  console.log(list, 111);
  let currentList = Object.entries(list.data).find(l => l[1] === item);
  console.log(currentList, 222);
  await axios.delete(`https://cinema-a31fc.firebaseio.com/users/${userId[0]}/is_favourite/${currentList[0]}.json`, item);
  let index = currentUser.is_favourite.findIndex(i => i === item);
  currentUser.is_favourite.splice(index, 1);
  localStorage.setItem('user', JSON.stringify(currentUser));
  dispatch({
    type: REMOVE_FROM_MY_LIST,
    payload: index
  })
};