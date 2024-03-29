import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../../store/session';
import SignupForm from '../SessionForms/SignupForm';
import LoginForm from '../SessionForms/LoginForm';
import { recieveLightDark } from '../../store/session';
import { Icon } from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import "./NavBar.css"

export default function NavBar () {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => !!state.session.user);
  const loggedInUser = useSelector(state=>state.session.user)




// ⁡⁣⁣=============== dark mode functionality =============================⁡
  const isLight = useSelector(state => state?.session?.isLight)
  const [hovered, setHovered] = useState(false)
  const [lightDark, setLightDark] = useState(isLight)


  function handleLighting(e){
    // e.preventDefault()
    dispatch(recieveLightDark(!isLight))
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
  }, [dispatch]);
  
  return (
      <div>
        <div id='nav-main'>
          {loggedInUser &&  <h1 className='title-header'>LemonChord.v3</h1>}
          <div id="nav-auth">
            {loggedInUser &&             
              <button onClick={(e)=>logoutUser(e)}
                className='log-out-button'
              >
                Log Out
                </button>
            }
            <WbSunnyRoundedIcon
              className='light-dark-mode-icon'
              onClick={handleLighting}
            />
          </div>
        </div>
      </div>
  );
}
