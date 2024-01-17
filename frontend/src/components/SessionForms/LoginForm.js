// src/components/SessionForms/LoginForm.js

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './LoginForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  const handleDemoSubmit = (e) =>{
    e.preventDefault()
    setEmail("lee.robert053@gmail.com")
    setPassword("Asianman2453")
    dispatch(login({ email, password })); 
  }

  return (
    <>
    <form id="login" onSubmit={()=>handleSubmit}>
      <h2 className='subtitle-header'>Log In</h2>
      <div className="errors">{errors?.email}</div>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
          className='session-form'
        />
      <div className="errors">{errors?.password}</div>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
          className='session-form'
        />
      <input
        type="submit"
        value="Log In"
        disabled={!email || !password}
        className='session-submit'
        style={{
          // height: "40px"
        }}
      />
    </form>

    <form id='alt-signin' onSubmit={handleDemoSubmit}>
        <input type='submit'/>
    </form>
    </>
  );
}

export default LoginForm;