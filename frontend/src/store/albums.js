import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

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



// ⁡⁢⁢⁢errors =========================⁡


const RECIEVE_TRACK_ERRORS = "tracks/RECEIVE_TRACK_ERRORS";
function recieveErrors(errors){
    return {
        type: RECIEVE_TRACK_ERRORS,
        errors
    }
}

const albumsReducer = (state={}, action)=>{
    let newState = {...state}
    switch(action.type){
        case RECEIVE_ALBUMS:
            return {...newState, all: action.albums}
        default:
            return newState
    }
}

export default albumsReducer