import axios from 'axios'
import {CLEAR_ERROR, LOGIN_ERROR, LOGOUT_USER, SET_USER} from "./actionType";

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
        id: data.localId
      };
      if(isLogin){
        let res = await axios.get('https://cinema-a31fc.firebaseio.com/users.json');
        user = Object.values(res.data).find(item => item.id === data.localId);
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

export const clearError = () => {
  return{
    type: CLEAR_ERROR
  }
};