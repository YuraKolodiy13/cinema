import React, {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import './App.scss';
import FilmsPage from "../../pages/FilmsPage/FilmsPage";
import SingleFilmPage from "../../pages/SingleFilmPage/SingleFilmPage";
import '../../assets/styles/globals.scss'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../../pages/Auth/Login/Login";
import Register from "../../pages/Auth/Register/Register";
import {connect} from "react-redux";
import {autoLogin} from "../../store/actions/auth";

const App = props => {

  useEffect(() => {
    props.autoLogin();
    checkMenu();
    window.addEventListener('scroll', checkMenu);
  }, []);

  const checkMenu = () => {
    if(document.querySelector('body').getBoundingClientRect().top < 0){
      document.querySelector('.header').classList.add('fixed');
    }else {
      document.querySelector('.header').classList.remove('fixed');
    }
  };

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path='/' component={FilmsPage} exact/>
        <Route path='/film/:id' component={SingleFilmPage} exact/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Switch>
      <Footer/>
    </div>
  );
};

export default connect(null, {autoLogin})(App);
