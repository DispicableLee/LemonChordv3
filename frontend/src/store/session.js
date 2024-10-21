import jwtFetch from './jwt';

// Action Types
const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";
const RECIEVE_LIGHT_DARK = "session/RECIEVE_LIGHT_DARK";
const RECIEVE_CURRENT_TRACK = "session/RECIEVE_CURRENT_TRACK";
const REMOVE_CURRENT_TRACK = "session/REMOVE_CURRENT_TRACK";
const RECIEVE_INDEX_PLAYFEED = "session/RECIEVE_INDEX_PLAYFEED";
const RECIEVE_CURRENT_PLAYFEED = "session/RECIEVE_CURRENT_PLAYFEED";
const PLAY_PREVIOUS_TRACK = "session/PLAY_PREVIOUS_TRACK";
const PLAY_NEXT_TRACK = "session/PLAY_NEXT_TRACK";

// Get the API URL from environment variables
const REACT_APP_API = process.env.REACT_APP_API;

// Action Creators
export const recieveLightDark = (isLight) => ({
    type: RECIEVE_LIGHT_DARK,
    payload: isLight,
});

export const recieveCurrentTrack = (track) => ({
    type: RECIEVE_CURRENT_TRACK,
    track,
});

export const removeCurrentTrack = () => ({
    type: REMOVE_CURRENT_TRACK,
});

// Playfeed Actions
export const recieveIndexPlayfeed = (playFeed) => ({
    type: RECIEVE_INDEX_PLAYFEED,
    playFeed,
});

export const setupIndexPlayfeed = () => async (dispatch) => {
    try {
        const res = await jwtFetch(`${REACT_APP_API}/api/tracks`);
        const tracks = await res.json();
        dispatch(recieveIndexPlayfeed(tracks));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const recieveCurrentPlayfeed = (playFeed) => ({
    type: RECIEVE_CURRENT_PLAYFEED,
    playFeed,
});

export const setupCurrentPlayfeed = (albumId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`${REACT_APP_API}/api/albums/${albumId}`);
        const shownAlbum = await res.json();
        dispatch(recieveCurrentPlayfeed(shownAlbum?.tracks));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            console.log("Sorry, couldn't do it.");
        }
    }
};

export function playPreviousTrack(trackId) {
    return {
        type: PLAY_PREVIOUS_TRACK,
        trackId,
    };
}

export const playNextTrack = (trackId) => ({
    type: PLAY_NEXT_TRACK,
    trackId,
});

// Authentication Actions
const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser,
});

const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
});

const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT,
});

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS,
});

export const getCurrentUser = () => async (dispatch) => {
    const res = await jwtFetch(`/api/users/current`);
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
};

export const signup = (user) => startSession(user, `${REACT_APP_API}/api/users/register`);
export const login = (user) => startSession(user, `${REACT_APP_API}/api/users/login`);

const startSession = (userInfo, route) => async (dispatch) => {
    try {
        const res = await jwtFetch(route, {
            method: "POST",
            body: JSON.stringify(userInfo),
        });
        const { user, token } = await res.json();
        localStorage.setItem('jwtToken', token);
        return dispatch(receiveCurrentUser(user));
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors));
        }
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
};

// Session Errors Reducer
const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
        case CLEAR_SESSION_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

// Session Reducer
const initialState = {
    user: undefined,
};

const sessionReducer = (state = initialState, action) => {
    let currentTrackIndex;
    let changedTrack;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { ...state, user: action.currentUser };
        case RECEIVE_USER_LOGOUT:
            return initialState;
        case RECIEVE_INDEX_PLAYFEED:
            return { ...state, playFeed: action.playFeed };
        case RECIEVE_CURRENT_PLAYFEED:
            return { ...state, playFeed: action.playFeed };
        case PLAY_PREVIOUS_TRACK:
            currentTrackIndex = state.playFeed.findIndex(track => track._id === action.trackId);
            if (currentTrackIndex === 0) {
                changedTrack = state.playFeed[state.playFeed.length - 1];
            } else if (currentTrackIndex > 0) {
                changedTrack = state.playFeed[currentTrackIndex - 1];
            } else {
                console.log("Dunno what you did, but this track doesn't exist.");
            }
            return { ...state, currentTrack: changedTrack };
        case PLAY_NEXT_TRACK:
            currentTrackIndex = state.playFeed.findIndex(track => track._id === action.trackId);
            if (currentTrackIndex === state.playFeed.length - 1) {
                changedTrack = state.playFeed[0];
            } else {
                changedTrack = state.playFeed[currentTrackIndex + 1];
            }
            return { ...state, currentTrack: changedTrack };
        case RECIEVE_LIGHT_DARK:
            return { ...state, isLight: action.payload };
        case RECIEVE_CURRENT_TRACK:
            return { ...state, currentTrack: action.track };
        case REMOVE_CURRENT_TRACK:
            return { ...state, currentTrack: null };
        default:
            return state;
    }
};

export default sessionReducer;
