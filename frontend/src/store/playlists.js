import jwtFetch from "./jwt";

// Get the API URL from environment variables
const REACT_APP_API = process.env.REACT_APP_API;

// ======================================== RECIEVE_PLAYLISTS ================================
const RECIEVE_PLAYLISTS = "playlists/RECIEVE_PLAYLISTS";
function recievePlaylists(playlists) {
    return {
        type: RECIEVE_PLAYLISTS,
        playlists,
    };
}

export const fetchPlaylists = () => async (dispatch) => {
    try {
        const res = await jwtFetch(`${REACT_APP_API}/api/playlists`);
        const playlists = await res.json();
        dispatch(recievePlaylists(playlists));
    } catch (err) {
        console.log(err);
    }
};

// ========================================== RECIEVE_ONE_PLAYLIST ====================================
const RECIEVE_ONE_PLAYLIST = "playlists/RECIEVE_ONE_PLAYLIST";

export function recieveOnePlaylist(playlist) {
    return {
        type: RECIEVE_ONE_PLAYLIST,
        playlist,
    };
}

export const fetchOnePlaylist = (playlistId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`${REACT_APP_API}/api/playlists/find/${playlistId}`);
        const shownPlaylist = await res.json();
        dispatch(recieveOnePlaylist(shownPlaylist));
    } catch (err) {
        console.log(err);
    }
};

const RECIEVE_NEW_PLAYLIST = "playlists/RECIEVE_NEW_PLAYLIST";
function recieveNewPlaylist(playlist) {
    return {
        type: RECIEVE_NEW_PLAYLIST,
        playlist,
    };
}

export const createOnePlaylist = (userId, playlistFormData) => async (dispatch) => {
    try {
        const res = await jwtFetch(`${REACT_APP_API}/api/playlists/newplaylist/${userId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistFormData),
        });
        const createdPlaylist = await res.json();
        dispatch(recieveNewPlaylist(createdPlaylist));
    } catch (err) {
        console.log("Trouble creating Playlist");
    }
};

const ADD_TRACKS_TO_PLAYLIST = "playlists/ADD_TRACKS_TO_PLAYLIST";

function recieveTracksInPlaylist(updatedPlaylist) {
    return {
        type: ADD_TRACKS_TO_PLAYLIST,
        updatedPlaylist,
    };
}

export const addSongsToPlaylist = (playlistId, trackIdsToAdd) => async (dispatch) => {
    try {
        const res = await jwtFetch(`${REACT_APP_API}/api/playlists/addsongs/${playlistId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ trackIdsToAdd }),
        });
        const updatedPlaylist = await res.json();
        dispatch(recieveTracksInPlaylist(updatedPlaylist));
    } catch (err) {
        console.log("Error adding songs to playlist");
    }
};

const playlistsReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECIEVE_ONE_PLAYLIST:
            return { ...newState, shownPlaylist: action.playlist };
        case RECIEVE_NEW_PLAYLIST:
            const updatedAllPlaylists = newState.all ? [...newState.all, action.playlist] : [action.playlist];
            return { ...newState, all: updatedAllPlaylists };
        case ADD_TRACKS_TO_PLAYLIST:
            newState = { ...newState, ...action.updatedPlaylist };
            return newState;
        default:
            return newState;
    }
};

export default playlistsReducer;
