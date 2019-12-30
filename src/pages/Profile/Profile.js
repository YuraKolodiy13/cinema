import React, {useEffect} from 'react'
import FilmItem from "../../components/FilmItem/FilmItem";
import {connect} from 'react-redux'
import './Profile.scss'
import {getFilms} from "../../store/actions/films";

const Profile = props => {

  useEffect(() => {
    props.getFilms();
  }, []);


  return(
    <div className='films profile'>
      <div className="container">
        <div className="films__items">
          {props.user && props.user.is_favourite.length
            ? props.films.map((item, key) => Object.values(props.user.is_favourite).find(fav => fav === item.id)
              ? <FilmItem item={item} key={key}/>
              : null)
          : <h2>Your list is empty</h2>
          }
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    films: state.films.films
  }
};

const mapDispatchToProps = {
  getFilms: getFilms
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)