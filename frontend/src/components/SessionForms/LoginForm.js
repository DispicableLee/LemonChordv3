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
    <form id="login" onSubmit={handleSubmit}>
      <h2 className='subtitle-header'>Log In</h2>
      <div className="errors">{errors?.email}</div>
        <input type="text"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
          className='session-form'
        />
      <div className="errors"><p>{errors?.password}</p></div>
        <input type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
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