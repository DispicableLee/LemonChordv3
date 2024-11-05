import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import {fetchTracks} from "../../store/tracks"
import { fetchOnePlaylist,addSongsToPlaylist } from "../../store/playlists";
import SingleTrack from "../SingleTrack/SingleTrack";
import './PlaylistShow.css'

export default function PlaylistShow(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const shownPlaylist = useSelector(store=>store?.playlists?.shownPlaylist)
    const allTracks = useSelector(store=>store?.tracks)
    const [trackSelect, setTrackSelect] = useState(false)
    const [trackIdsToAdd, settrackIdsToAdd] = useState([])
    useEffect(()=>{
        dispatch(fetchOnePlaylist(id))
        dispatch(fetchTracks())
        // console.log(trackIdsToAdd)
    }, [dispatch])
    console.log("shownPlaylist", shownPlaylist)
    useEffect(()=>{
        console.log(trackIdsToAdd)
    }, [trackIdsToAdd])





    const renderedPlaylistTracks = shownPlaylist?.tracks.map((track, index)=>{
        return (
            <SingleTrack 
                key={track._id} 
                title={track.title}
                audioUrl = {track.audioUrl}
                uploader = {track.uploader}
                album = {track.album}
                style={{ animationDelay: `${index * 0.1}s` }}
            />
        )
    })

    function handletrackIdsToAdd(trackId){
        settrackIdsToAdd([...trackIdsToAdd, trackId])
    }


    const tracksToSelect = allTracks?.map((track)=>{
        return (
            <div id="track-option"
                className={trackSelect ? "select" : ""}
                onClick={()=>handletrackIdsToAdd(track._id)}
            >
                <h3>{track.title}</h3>
            </div>
        )
    })

    return (
        <div id="playlist-show-main">

            <div className="playlist-show-header">
                <h2>{shownPlaylist?.title}</h2>
                <h4>{shownPlaylist?.tracks?.length} tracks</h4>
            </div>

            <div className="add-new-song"
                onClick={()=>setTrackSelect(!trackSelect)}
            >
                <h2>Add Song(s)</h2>
            </div>
            
            <div className="tracks-index-slash-track-selection">
                <div id="tracks-index-div"
                    className={trackSelect ? "aside" : ""}
                >
                    {renderedPlaylistTracks}
                </div>

                <div id="track-selection-div" 
                    className={trackSelect ? "on" : ""}
                >   
                    {tracksToSelect}

                    <button
                        id="track-add-button"
                        className={trackSelect ? "select" : ""}
                        onClick={()=>dispatch(addSongsToPlaylist(shownPlaylist?._id, trackIdsToAdd))}
                    >
                        Done
                    </button>
                </div>

            </div>
        </div>
    )
}