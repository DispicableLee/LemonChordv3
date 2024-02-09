import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import AlbumIndex from './components/AlbumIndex/AlbumIndex';
import AlbumShow from './components/AlbumShow/AlbumShow';
import AudioFooter from './components/AudioFooter/AudioFooter';
import NavBar from './components/NavBar/NavBar';
import SplashForm from './components/SplashForms/SplashForm';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import { recieveLightDark } from './store/session';
import { getCurrentUser } from './store/session';
import { fetchTracks } from './store/tracks';
import "./App.css"

export default function App() {
  // ===================== loads a user in and initializes the app component =====================
  const [loaded, setLoaded] = useState(false);
  const loggedIn = useSelector(store=>!!store.session.user)
  const currentTrack = useSelector(store=>store?.session?.currentTrack)
  const lighting = useSelector(store=>store.session.isLight)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(recieveLightDark(true))
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  // ==================== handles the changes in lighting ============================
  const isLight = useSelector(store =>store.session.isLight)

  return loaded && (
    <div id='app' className={isLight ? '' : 'dark-mode'}>
      <NavBar/>
      {!loggedIn ? <SplashForm/> : <MainPage/>}
      {loggedIn && currentTrack && <AudioFooter/>}
      <Switch>
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
      </Switch>
    </div>
  );
}