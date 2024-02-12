import jwtFetch from "./jwt";


const RECIEVE_PLAYLIST = "playlists/RECIEVE_PLAYLIST"
function recievePlaylist(playlist){
    return {
        type: RECIEVE_PLAYLIST,
        playlist
    }
}

export const fetchOnePlaylist = (playlistId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/playlists/find/${playlistId}`)
        const shownPlaylist = await res.json()
        dispatch(recievePlaylist(shownPlaylist))

    }catch(err){
        console.log(err)
    }
}


const playlistsReducer = (state={}, action)=>{
    let newState = {...state}
    switch(action.type){
        case RECIEVE_PLAYLIST:
            return {...newState, shownPlaylist: action.playlist}
        default:
            return newState
    }
}

export default playlistsReducer