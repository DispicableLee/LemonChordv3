import React from "react";
import { useState, useEffect } from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useSelector } from "react-redux/es/hooks/useSelector";
import './SearchBar.css'
export default function SearchBar({tracks, setTracks, fetchedTracks}){
    function handleTracksFilter(search){
        if(search.length===0){ 
            setTracks(fetchedTracks)
        }else{
            const filteredTracks = tracks.filter((track) =>
                track.title.toLowerCase().replace(/\s/g, '').startsWith(search.toLowerCase())
            );
            setTracks(filteredTracks)
        }      
    }
    return (
        <div id="search-main">
                <SearchRoundedIcon/>
                <input type="text"
                    placeholder="Search for tracks"    
                    onChange={(e)=>handleTracksFilter(e.target.value)}
                />
        </div>
    )
}