import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import {fetchTracks} from "../../store/tracks"
import { fetchOnePlaylist } from "../../store/playlists";
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

    useEffect(()=>{
        console.log(trackIdsToAdd)
    }, [trackIdsToAdd])


    function handletrackIdsToAdd(trackId){
        settrackIdsToAdd([...trackIdsToAdd, trackId])
        // console.log(trackIdsToAdd)
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
            </div>
            <div className="add-new-song"
                onClick={()=>setTrackSelect(!trackSelect)}
            >
                <h2>Add Song(s)</h2>
            </div>
            <div                                                className="tracks-index-slash-track-selection"
            >
                <div id="tracks-index-div"
                    className={trackSelect ? "aside" : ""}
                >

                </div>
                <div id="track-selection-div" 
                    className={trackSelect ? "on" : ""}
                >   
                    {tracksToSelect}
                </div>
            </div>
        </div>
    )
}