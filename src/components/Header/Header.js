import React, {useEffect} from 'react'
import './Header.scss'
import {NavLink} from  'react-router-dom'
import {connect} from 'react-redux'
import {logout} from "../../store/actions/auth";


const Header = props => {

  return(
    <div className='header'>
      <div className="header__container container">
        <h1>
          <NavLink to={'/'} exact>Home</NavLink>
        </h1>
        {props.user
          ? <ul>
            <li>
              <NavLink to={`/profile/${props.user.id}`}>{props.user.name}</NavLink>
            </li>
            <li>
              <span onClick={props.logout}>Logout</span>
            </li>
          </ul>
          : <ul>
            <li>
              <NavLink to='/login'>Sign in</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Sign up</NavLink>
            </li>
          </ul>
        }
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return{
    user: state.auth.user
  }
}

const mapDispatchToProps ={
  logout: logout
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)