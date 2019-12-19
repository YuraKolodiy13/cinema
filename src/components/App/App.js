import React from 'react';
import {Route, Switch} from "react-router-dom";
import './App.scss';
import FilmsPage from "../../pages/FilmsPage/FilmsPage";
import SingleFilmPage from "../../pages/SingleFilmPage/SingleFilmPage";
import '../../assets/styles/globals.scss'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path='/' component={FilmsPage} exact/>
        <Route path='/film/:id' component={SingleFilmPage} exact/>
      </Switch>
      <Footer/>
    </div>
  );
};

export default App;
