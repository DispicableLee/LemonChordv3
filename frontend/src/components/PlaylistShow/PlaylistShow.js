import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { fetchOnePlaylist } from "../../store/playlists";
import './PlaylistShow.css'

export default function PlaylistShow(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const shownPlaylist = useSelector(store=>store?.playlists?.shownPlaylist)
    useEffect(()=>{
        dispatch(fetchOnePlaylist(id))
    }, [dispatch])

    return (
        <div id="playlist-show-main">
            <div className="playlist-show-header">
                <h2>{shownPlaylist?.title}</h2>
            </div>

        </div>
    )
}