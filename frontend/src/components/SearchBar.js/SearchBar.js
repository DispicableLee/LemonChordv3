import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import './SearchBar.css'
export default function SearchBar({items}){
    const currentTrack = useSelector(store=>store?.session?.currentTrack)
    
    console.log(currentTrack)
    return (
        <div id="search-main">
                
        </div>
    )
}