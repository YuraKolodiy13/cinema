import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getFilms} from "../../store/actions/films";
import {Link} from  'react-router-dom'
import './FilmsPage.scss'
import Loader from "../../components/Loader/Loader";
import Tabs from "../../components/Tabs/Tabs";

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
            ? <div className='films__item' key={key}>
              <div className="films__img">
                <img src={item.poster_image} alt=""/>
              </div>
              <div className="films__info">
                <p>{item.name}</p>
              </div>
              <Link to={`film/${item.id}`} />
            </div>
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
    loading: state.films.loading,
    currentCategory: state.films.currentCategory
  }
};

const mapDispatchToProps = {
  getFilms: getFilms
};

export default connect(mapsStateToProps, mapDispatchToProps)(FilmsPage)