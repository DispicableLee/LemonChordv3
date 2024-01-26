import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";


// ⁡⁢⁢⁡⁣⁢⁣============= GET album actions ==============⁡⁡
const RECEIVE_ALBUMS = "albums/RECEIVE_ALBUMS"
function receiveAlbums(albums){
    return {
        type: RECEIVE_ALBUMS,
        albums
    }
}

export const fetchAlbums = () => async dispatch =>{
    try{
        const res = await jwtFetch('/api/albums')
        const albums = await res.json()
        dispatch(receiveAlbums(albums))
    }catch(err){
        const resBody = await err.json();
        if(resBody.statusCode === 400){
            dispatch(recieveErrors(resBody.errors))
        }
    }
}

const RECEIVE_ALBUM = "albums/RECEIVE_ALBUM"
function receiveAlbum(album){
    return {
        type: RECEIVE_ALBUM,
        album
    }
}

export const fetchOneAlbum = (albumId) => async dispatch=>{
    try{
        const res = await jwtFetch(`/api/albums/${albumId}`)
        const shownAlbum = await res.json()
        dispatch(receiveAlbum(shownAlbum))
    }catch(err){
        const resBody = await err.json();
        if(resBody.statusCode === 400){
            dispatch(recieveErrors(resBody.errors))
        }
    }
}



// ⁡⁣⁣⁡⁣⁢⁣============== POST album actions ================⁡⁡
const RECIEVE_NEW_ALBUM = "albums/RECIEVE_NEW_ALBUM"

function recieveNewAlbum(album){
    return {
        type: RECIEVE_NEW_ALBUM,
        album
    }
}


export const uploadNewAlbum = (albumFormData) => async dispatch =>{
    try{
        // debugger
        const res = await jwtFetch('/api/albums',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(albumFormData)
        })
        if (!res.ok) {
            // Handle error as needed
            console.error('Failed to create new album');
            return;
        }

        // Dispatch any actions or handle success as needed
        console.log('New album created successfully');
        const data = await res.json()
        // You might want to dispatch a fetchAlbums action to update the list of albums
        dispatch(recieveNewAlbum(data));
    }catch (error) {
        console.error('Error creating new album', error);
    }
}


// ⁡⁢⁣⁢================== errors =========================⁡⁡


const RECIEVE_ALBUM_ERRORS = "albums/RECEIVE_TRACK_ERRORS";
function recieveErrors(errors){
    return {
        type: RECIEVE_ALBUM_ERRORS,
        errors
    }
}
const CLEAR_ALBUM_ERRORS = 'albums/CLEAR_ALBUM_ERRORS'
export function clearAlbumErrors(){
    return {
        type: CLEAR_ALBUM_ERRORS
    }
}
const nullErrors = null
export const albumErrorsReducer = (state=nullErrors, action)=>{
    switch(action.type){
        case RECIEVE_ALBUM_ERRORS:
            return action.errors;
        case CLEAR_ALBUM_ERRORS:
            return nullErrors;
        default:
            return state;
    }
}

const albumsReducer = (state={}, action)=>{
    let newState = {...state}
    switch(action.type){
        case RECEIVE_ALBUMS:
            return {...newState, all: action.albums}
        case RECEIVE_ALBUM:
            return {...newState, shownAlbum: action.album}
        case RECIEVE_NEW_ALBUM:
            const updatedAllAlbums = newState.all ? [...newState.all, action.album] : [action.album];
            return { ...newState, all: updatedAllAlbums };
        default:
            return newState
    }
}

export default albumsReducer