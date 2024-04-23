import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";


// ⁡⁢⁣⁣================ session actions ====================⁡
const RECIEVE_LIGHT_DARK = "session/RECIEVE_LIGHT_DARK";

export const recieveLightDark = isLight => ({
  type: RECIEVE_LIGHT_DARK,
  payload: isLight,
})

const RECIEVE_CURRENT_TRACK = "session/RECIEVE_CURRENT_TRACK"

export const recieveCurrentTrack = track => ({
  type: RECIEVE_CURRENT_TRACK,
  track
})

const REMOVE_CURRENT_TRACK = "session/REMOVE_CURRENT_TRACK"

export const removeCurrentTrack = () => ({
  type: REMOVE_CURRENT_TRACK
})

// ==========================================================================================
// =⁡⁣⁢⁣================== Session Playlist Actions (for skipping purposes) =====================
// ==========================================================================================⁡

const RECIEVE_INDEX_PLAYFEED = "session/RECIEVE_INDEX_PLAYFEED"
export const recieveIndexPlayfeed = (playFeed) =>({
  type: RECIEVE_INDEX_PLAYFEED,
  playFeed
})

export const setupIndexPlayfeed = () => async dispatch =>{
    try {
        const res = await jwtFetch('/api/tracks');
        const tracks = await res.json();
        dispatch(recieveIndexPlayfeed(tracks));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

const RECIEVE_CURRENT_PLAYFEED = "session/RECIEVE_CURRENT_PLAYFEED"
export const recieveCurrentPlayfeed = (playFeed) =>({
  type: RECIEVE_CURRENT_PLAYFEED,
  playFeed
})

export const setupCurrentPlayfeed = (albumId) => async dispatch =>{
    try{
        const res = await jwtFetch(`/api/albums/${albumId}`)
        const shownAlbum = await res.json()
        dispatch(recieveCurrentPlayfeed(shownAlbum?.tracks))
    }catch(err){
        const resBody = await err.json();
        if(resBody.statusCode === 400){
            console.log("sorry man, couldnt do it")
        }
    }
}



// ⁡⁣⁣⁢============= Auth Actions =======================⁡
// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});
  
// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});





export const getCurrentUser = () => async dispatch => {
  const res = await jwtFetch('/api/users/current');
  const user = await res.json();
  return dispatch(receiveCurrentUser(user));
};

export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

const startSession = (userInfo, route) => async dispatch => {
  // debugger
  try {  
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo)
    });
    const { user, token } = await res.json();
    localStorage.setItem('jwtToken', token);
    return dispatch(receiveCurrentUser(user));
  } catch(err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch(logoutUser());
};



// ⁡⁢⁢=========================⁢============ session errors =====================================⁡
const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};







const initialState = {
  user: undefined,
  // isLight: true, // Set the default value based on your requirements
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {...state, user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    case RECIEVE_INDEX_PLAYFEED:
      return {...state, playFeed: action.playFeed}
    case RECIEVE_CURRENT_PLAYFEED:
      return {...state, playFeed: action.playFeed}
    case RECIEVE_LIGHT_DARK:
      return {...state, isLight: action.payload}
    case RECIEVE_CURRENT_TRACK:
      return {...state, currentTrack: action.track}
    case REMOVE_CURRENT_TRACK:
      return {...state, currentTrack: null}
    default:
      return state;
  }
};

export default sessionReducer;