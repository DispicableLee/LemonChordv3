import React from "react";
import SearchBar from "../SearchBar.js/SearchBar";
import { useState, useEffect } from "react";
import { fetchTracks } from "../../store/tracks";
import { useDispatch, useSelector } from "react-redux";
import './TracksIndex.css'

export default function TracksIndex(){
    const dispatch = useDispatch()
    const [tracks, setTracks] = useState(useSelector(store=>store.tracks))
    console.log(tracks)
    useEffect(()=>{
        dispatch(fetchTracks())
    },[dispatch])

    const renderedTracks = tracks.map((track)=>{
        return (
            <div style={{
                border: "1px solid white",
                height: "5vh"
            }}>
                <h2>{track.title}</h2>
            </div>
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