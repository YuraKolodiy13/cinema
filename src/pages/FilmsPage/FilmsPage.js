import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getFilms} from "../../store/actions/films";
import './FilmsPage.scss'
import Loader from "../../components/Loader/Loader";
import Tabs from "../../components/Tabs/Tabs";
import FilmItem from "../../components/FilmItem/FilmItem";

const FilmsPage = props => {

  useEffect(() => {
    props.getFilms();
  }, []);

  if(props.loading){
    return <Loader/>
  }

  return(
    <div className='films'>
      <Tabs/>
      <div className="container">
        <div className="films__items">
          {props.films.map((item, key) => props.currentCategory === 'All' || item.genre === props.currentCategory
            ? props.user && props.user.is_favourite && Object.values(props.user.is_favourite).find(fav => fav === item.id)
              ? <FilmItem item={item} key={key} fav={true}/>
              : <FilmItem item={item} key={key}/>
            : null
          )}
        </div>
      </div>
    </div>
  )
};

const mapsStateToProps = state => {
  return{
    films: state.films.films,
    user: state.auth.user,
    loading: state.films.loading,
    currentCategory: state.films.currentCategory
  }
};

const mapDispatchToProps = {
  getFilms: getFilms
};

export default connect(mapsStateToProps, mapDispatchToProps)(FilmsPage)