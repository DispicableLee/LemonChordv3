import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './NewPlaylistForm.css'

export default function NewPlaylistForm(){
    const [trackSelect, setTrackSelect] = useState(false)







    return (
        <div id="new-playlist-form-main">
            <h1>Playlist Creation</h1>
            <form id="playlist-form" className="form">
                <input type="text"
                    
                />
                <div className="confirm-playlist-name"
                    onClick={()=>setTrackSelect(!trackSelect)}
                >
                    <h2>
                        Confirm Name
                    </h2>
                </div>
            </form>
        </div>
    )
}