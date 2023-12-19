import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_TRACKS = "tracks/RECIEVE_TRACKS"
function receiveTracks(tracks){
    return {
        type: RECEIVE_TRACKS,
        tracks
    }
}

export const fetchTracks = () => async dispatch =>{
    try {
        const res = await jwtFetch('/api/tracks');
        const tracks = await res.json();
        dispatch(receiveTracks(tracks));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
        }
    }
}

const UPDATE_TRACK = "tracks/UPDATE_TRACK";
function updateTrack(track){
    return {
        type: UPDATE_TRACK,
        track
    }
}

const DELETE_TRACK = "tracks/DELETE_TRACK";
function deleteTrack(trackId){
    return {
        type: DELETE_TRACK,
        trackId
    }
}

const RECEIVE_TRACK_ERRORS = "tracks/RECEIVE_TRACK_ERRORS";
function receiveErrors(errors){
    return {
        type: RECEIVE_TRACK_ERRORS,
        errors
    }
}

const CLEAR_TRACK_ERRORS = "tracks/CLEAR_TRACK_ERRORS";
export function clearTrackErrors(errors){
    return {
        type: CLEAR_TRACK_ERRORS,
        errors
    }
}



const nullErrors = null;

export const eventErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_TRACK_ERRORS:
      return action.errors;
    // case RECEIVE_NEW_TRACK:
    //   return {...state, [action.event._id]: action.event}
    case CLEAR_TRACK_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};


const tracksReducer = (state=[], action) =>{
    switch(action.type){
        case RECEIVE_TRACKS:
            return [...action.tracks]
        default:
            return state
    }
}

export default tracksReducer

