import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

// Action types
const RECEIVE_TRACKS = "tracks/RECEIVE_TRACKS";
const RECEIVE_NEW_TRACK = "tracks/RECEIVE_NEW_TRACK";
const DELETE_TRACK = "tracks/DELETE_TRACK";
const RECEIVE_TRACK_ERRORS = "tracks/RECEIVE_TRACK_ERRORS";
const CLEAR_TRACK_ERRORS = "tracks/CLEAR_TRACK_ERRORS";

// Action creators
function receiveTracks(tracks) {
    return {
        type: RECEIVE_TRACKS,
        tracks
    };
}

function receiveNewTrack(track) {
    return {
        type: RECEIVE_NEW_TRACK,
        track
    };
}

function deleteTrack(trackId) {
    return {
        type: DELETE_TRACK,
        trackId
    };
}

function receiveErrors(errors) {
    return {
        type: RECEIVE_TRACK_ERRORS,
        errors
    };
}

export function clearTrackErrors() {
    return {
        type: CLEAR_TRACK_ERRORS,
    };
}

// Thunk actions
export const fetchTracks = () => async dispatch => {
    try {
        const res = await jwtFetch(`/api/tracks`); // Directly use the endpoint
        const tracks = await res.json();
        dispatch(receiveTracks(tracks));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const postNewTrack = (userId, trackData) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/tracks/newtrack/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(trackData),
        });
        const newTrack = await res.json(); // Await JSON parsing
        dispatch(receiveNewTrack(newTrack));
    } catch (err) {
        const resErrors = await err.json();
        if (resErrors.statusCode === 400) {
            dispatch(receiveErrors(resErrors.errors));
        }
    }
};

// Error reducer
const nullErrors = null;

export const trackErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_TRACK_ERRORS:
            return action.errors;
        case CLEAR_TRACK_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

// Tracks reducer
const tracksReducer = (state = [], action) => {
    let newState = [...state];
    switch (action.type) {
        case RECEIVE_TRACKS:
            return [...action.tracks];
        case RECEIVE_NEW_TRACK:
            newState.unshift(action.track);
            return newState;
        // You can handle UPDATE_TRACK and DELETE_TRACK actions here if needed
        default:
            return state;
    }
};

export default tracksReducer;
