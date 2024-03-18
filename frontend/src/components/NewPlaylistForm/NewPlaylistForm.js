import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './NewPlaylistForm.css'

export default function NewPlaylistForm(){
    const [trackSelectModal, setTrackSelectModal] = useState(false)
    const [playlistTitle, setPlaylistTitle] = useState("")






    return (
        <div id="new-playlist-form-main">
            {trackSelectModal ? <h1>Select Playlist Tracks</h1> : <h1>Playlist Creation</h1>}
            <form id="playlist-form" 
                className={trackSelectModal ? "form-disabled" : "form"}
                onSubmit={(e)=>{
                    e.preventDefault()
                    setTrackSelectModal(!trackSelectModal)
                    // console.log(trackSelectModal)
                }}
            >
                <input type="text"
                    value={playlistTitle}
                    onChange={(e)=>setPlaylistTitle(e.target.value)}
                    placeholder="Title"
                    className="session-form"
                />
                <input type="submit"
                    disabled={!playlistTitle}
                    value="Confirm Playlist Title"
                    className="playlist-title-submit"
                />
            </form>
            {trackSelectModal 
            ?
                <div className="track-select-modal">


                </div>
            :
                <></>
            }
        </div>
    )
}