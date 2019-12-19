import React from 'react'
import './Header.scss'
import {Link} from  'react-router-dom'


const Header = () => {
  return(
    <div className='header'>
      <div className="container">
        <Link to={'/'}>Home</Link>
      </div>
    </div>
  )
};

export default Header