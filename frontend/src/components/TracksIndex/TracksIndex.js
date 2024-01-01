import React from "react";
import SearchBar from "../SearchBar.js/SearchBar";
import { useState, useEffect } from "react";
import { fetchTracks } from "../../store/tracks";
import { useDispatch, useSelector } from "react-redux";
import SingleTrack from "../SingleTrack/SingleTrack";
import './TracksIndex.css'

export default function TracksIndex(){
    const dispatch = useDispatch()
    // const [tracks, setTracks] = useState(fetchedTracks || [])
    useEffect(()=>{
        dispatch(fetchTracks())
    },[dispatch])
    const fetchedTracks = useSelector(store=>store?.tracks)
    // console.log(fetchedTracks)
    const renderedTracks = fetchedTracks?.map((track)=>{
        return (
            <SingleTrack 
                key={track._id} 
                title={track.title}
                audioUrl = {track.audioUrl}
                uploader = {track.uploader}
                album = {track.album}
            />
        )
    })

    return (
        <div id="tracks-index-main">
            <SearchBar/>
            <div>
                {renderedTracks}
            </div>
        </div>
    )
}