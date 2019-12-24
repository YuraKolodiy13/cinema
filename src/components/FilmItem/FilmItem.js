import React from 'react'
import Watch from "../../components/Watch/Watch";
import {Link} from  'react-router-dom'
import './FilmItem.scss'

const FilmItem = props => {
  return (
    <div className='films__wrapper'>
      <div className='films__item'>
        <div className="films__img">
          <img src={props.item.poster_image} alt=""/>
          <div className="films__overlay">
            <Watch film={props.item}/>
          </div>
        </div>
        <div className="films__info">
          <p>{props.item.name}</p>
        </div>
        <Link to={`/film/${props.item.id}`} className='films__link'/>
      </div>
    </div>
  )
};

export default FilmItem