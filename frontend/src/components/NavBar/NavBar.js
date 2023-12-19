import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../../store/session';
import SignupForm from '../SessionForms/SignupForm';
import LoginForm from '../SessionForms/LoginForm';
import { recieveLightDark } from '../../store/session';
import { Icon } from '@iconify/react';
import "./NavBar.css"

export default function NavBar () {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => !!state.session.user);
  const loggedInUser = useSelector(state=>state.session.user)




// ⁡⁣⁣=============== dark mode functionality =============================⁡
  const isLight = useSelector(state => state.session.isLight)
  const [hovered, setHovered] = useState(false)
  const [lightDark, setLightDark] = useState(isLight)
  function handleLighting(e){
    e.preventDefault()
    setLightDark(!lightDark)
    dispatch(recieveLightDark(lightDark))
  }

  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const [showModal, setShowModal] = useState(null);
  const [navOpacity, setNavOpacity] = useState(1);



  const handleScroll = () => {
    const newOpacity = Math.max(0.75 - window.scrollY / window.innerHeight, 0);
    setNavOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
      <div>
        <div id='nav-main'>
          {loggedInUser &&  <h1 className='title-header'>LemonChord</h1>}
          <div id="nav-auth">
            {loggedInUser &&             
              <button onClick={(e)=>logoutUser(e)}>Log Out</button>
            }
            <Icon 
              icon="ph:sun-thin" 
              color= {hovered ? "#6a0d83" : "#e2e2e2"} 
              width="70" 
              height="70" 
              onMouseOver={()=>setHovered(true)}
              onMouseLeave={()=>setHovered(false)}
              onClick={handleLighting}
              style={{
                transition: 'color 0.3s ease'
              }}
              />
          </div>
        </div>
      </div>
  );
}
