import jwtFetch from "./jwt";








// ======================================== RECIEVE_PLAYLISTS
const RECIEVE_PLAYLISTS = "playlists/RECIEVE_PLAYLISTS"
function recievePlaylists(playlists){
    return {
        type: RECIEVE_PLAYLISTS,
        playlists
    }
}

export const fetchPlaylists = ()=>async dispatch=>{

}

// ========================================== RECIEVE_ONE_PLAYLIST
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

const ADD_TRACKS_TO_PLAYLIST = "playlists/ADD_TRACKS_TO_PLAYLIST"

function recieveTracksInPlaylist(updatedPlaylist){
    return {
        type: ADD_TRACKS_TO_PLAYLIST,
        updatedPlaylist
    }
}








export const addSongsToPlaylist = (playlistId, trackIdsToAdd) => async dispatch=>{
    try{    
        debugger
        const updatedPlaylist = await jwtFetch(`/api/playlists/addsongs/${playlistId}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({trackIdsToAdd})
        })
        debugger
        dispatch(recieveTracksInPlaylist(updatedPlaylist))
    }catch(err){
        console.log("error adding songs to playlist")
    }
}

















const playlistsReducer = (state={}, action)=>{
    let newState= {...state}
    switch(action.type){
        case RECIEVE_ONE_PLAYLIST:
            return {...newState, shownPlaylist: action.playlist}
        case ADD_TRACKS_TO_PLAYLIST:
            newState = {...newState, ...action.updatedPlaylist}
            return newState
        default:
            return newState
    }
}

export default playlistsReducer