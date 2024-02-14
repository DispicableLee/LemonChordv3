import jwtFetch from "./jwt";

const RECIEVE_PLAYLISTS = "playlists/RECIEVE_PLAYLISTS"
function recievePlaylists(playlists){
    return {
        type: RECIEVE_PLAYLISTS,
        playlists
    }
}

export const fetchPlaylists = ()=>async dispatch=>{

}


const RECIEVE_ONE_PLAYLIST = "playlists/RECIEVE_ONE_PLAYLIST"
function recieveOnePlaylist(playlist){
    return {
        type: RECIEVE_ONE_PLAYLIST,
        playlist
    }
}

export const fetchOnePlaylist = (playlistId) =>async dispatch =>{
    try{
        const res = await jwtFetch(`/api/playlists/find/${playlistId}`)
        const shownPlaylist = await res.json()
        dispatch(recieveOnePlaylist(shownPlaylist))
    }catch(err){
        console.log(err)
    }
}

const playlistsReducer = (state={}, action)=>{
    let newState= {...state}
    switch(action.type){
        case RECIEVE_ONE_PLAYLIST:
            return {...newState, shownPlaylist: action.playlist}
        default:
            return newState
    }
}

export default playlistsReducer