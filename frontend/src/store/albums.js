import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

// Base API URL
const REACT_APP_API = process.env.REACT_APP_API

// ============= GET album actions ==============
const RECEIVE_ALBUMS = "albums/RECEIVE_ALBUMS";
function receiveAlbums(albums) {
    return {
        type: RECEIVE_ALBUMS,
        albums
    };
}

export const fetchAlbums = () => async dispatch => {
    try {
        const res = await jwtFetch(`${REACT_APP_API}/api/albums`);
        const albums = await res.json();
        dispatch(receiveAlbums(albums));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

const RECEIVE_ALBUM = "albums/RECEIVE_ALBUM";
function receiveAlbum(album) {
    return {
        type: RECEIVE_ALBUM,
        album
    };
}

export const fetchOneAlbum = (albumId) => async dispatch => {
    try {
        const res = await jwtFetch(`${REACT_APP_API}/api/albums/${albumId}`);
        const shownAlbum = await res.json();
        dispatch(receiveAlbum(shownAlbum));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

// =============== POST album actions ================
const RECEIVE_NEW_ALBUM = "albums/RECEIVE_NEW_ALBUM";

function receiveNewAlbum(album) {
    return {
        type: RECEIVE_NEW_ALBUM,
        album
    };
}

export const uploadNewAlbum = (albumFormData) => async dispatch => {
    try {
        const res = await jwtFetch(`${REACT_APP_API}/api/albums`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(albumFormData)
        });

        if (!res.ok) {
            console.error('Failed to create new album');
            return;
        }

        console.log('New album created successfully');
        const data = await res.json();
        dispatch(receiveNewAlbum(data));
    } catch (error) {
        const res = await error.json();
        return dispatch(receiveErrors(res.errors));
    }
}

// ========================= DELETE ALBUM ACTIONS =========================
const DELETE_ALBUM = "albums/DELETE_ALBUM";
function removeAlbum(albumId) {
    return {
        type: DELETE_ALBUM,
        albumId
    };
}

export const deleteAlbum = (albumId) => async dispatch => {
    try {
        await jwtFetch(`${REACT_APP_API}/api/albums/delete/${albumId}`, {
            method: "DELETE"
        });
        dispatch(removeAlbum(albumId));
    } catch (err) {
        const res = await err.json();
        return dispatch(receiveErrors(res.errors));
    }
}

// ================ errors =========================
const RECEIVE_ALBUM_ERRORS = "albums/RECEIVE_ALBUM_ERRORS";
function receiveErrors(errors) {
    return {
        type: RECEIVE_ALBUM_ERRORS,
        errors
    };
}

const CLEAR_ALBUM_ERRORS = 'albums/CLEAR_ALBUM_ERRORS';
export function clearAlbumErrors() {
    return {
        type: CLEAR_ALBUM_ERRORS
    };
}

const nullErrors = null;
export const albumErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_ALBUM_ERRORS:
            return action.errors;
        case CLEAR_ALBUM_ERRORS:
            return nullErrors;
        default:
            return state;
    }
}

const albumsReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_ALBUMS:
            return { ...newState, all: action.albums };
        case RECEIVE_ALBUM:
            return { ...newState, shownAlbum: action.album };
        case RECEIVE_NEW_ALBUM:
            const updatedAllAlbums = newState.all ? [...newState.all, action.album] : [action.album];
            return { ...newState, all: updatedAllAlbums };
        case DELETE_ALBUM:
            delete newState[action.albumId];
            return newState;
        default:
            return newState;
    }
}

export default albumsReducer;
