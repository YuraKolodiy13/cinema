import React, {useState, useEffect, Fragment} from 'react'
import {connect} from "react-redux";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import '../index.scss'
import {auth} from "../../../store/actions/auth";
import {Helmet} from "react-helmet";
import {Link} from  'react-router-dom'

const Login = props => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if(props.user){
      props.history.push('/')
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    props.auth(email, password, true);
  };

  const onBlur = e => {
    e.target.closest('.MuiFormControl-root').classList.remove('trigger')
  };

  const changePasswordType = e => {
    e.target.parentElement.classList.toggle('show');
    if(e.target.nextElementSibling.querySelector('input').getAttribute('type') === 'password'){
      e.target.nextElementSibling.querySelector('input').setAttribute('type', 'text');
    }else {
      e.target.nextElementSibling.querySelector('input').setAttribute('type', 'password');
    }
  };

  return(
    <Fragment>
      <div className="pageTopTitleBar">
        <div className="container">
          <div className="pageTopTitleCont">
            <h1 className="title">Login</h1>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
              <li className="breadcrumb-item active">Login</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='auth__wrapper'>
        <ValidatorForm className='auth trigger__wrap' onSubmit={onSubmit} onError={() => document.querySelector('.auth').classList.remove('trigger__wrap')}>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <div className="form__field">
            <TextValidator
              className='trigger'
              type='email'
              value={email}
              label='Email'
              variant="outlined"
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              onBlur={onBlur}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'email is not valid']}
            />
          </div>
          <div className="form__field form__password">
            <span className='form__icon' onClick={changePasswordType}/>
            <TextValidator
              className='trigger'
              type='password'
              value={password}
              label='Password'
              variant="outlined"
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              onBlur={onBlur}
              validators={['required']}
              errorMessages={['this field is required']}
            >
            </TextValidator>
            {props.error.error ? <p>{props.error.error.message}</p> : null}
          </div>
          <Button
            variant="contained"
            color="primary"
            type='submit'
            className='button'
          >Sign in</Button>
        </ValidatorForm>
      </div>
    </Fragment>
  )
};

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    error: state.auth.error
  }
};

const mapDispatchToProps = {
  auth: auth
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)