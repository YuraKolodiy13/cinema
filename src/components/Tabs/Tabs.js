import React from 'react'
import './Tabs.scss'
import {connect} from "react-redux";
import {changeCurrentCategory} from "../../store/actions/films";

const Tabs = props => {
  return(
    <div className='container'>
      <ul className='tabs'>
        <li onClick={(e) => props.changeCurrentCategory(e.target.innerHTML)} className={props.currentCategory === 'All' ? 'active' : ''}>All</li>
        {props.categoriesInd.map((item, key) =>
          <li key={key} onClick={(e) => props.changeCurrentCategory(e.target.innerHTML)} className={props.currentCategory === item ? 'active' : ''}>{item}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    // cities: state.cities.cities,
    currentCategory: state.films.currentCategory,
    categoriesInd: state.films.categoriesInd
  }
}

const mapDispatchToProps = {
  changeCurrentCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)