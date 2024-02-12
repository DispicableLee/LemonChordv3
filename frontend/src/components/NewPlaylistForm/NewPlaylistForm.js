import React from "react";
import './NewPlaylistForm.css'
export default function NewPlaylistForm(){
    return (
        <div id="playlist-form-main">
            <div className="playlist-creation">
                <div className="playlist-form">
                    playlist form
                </div>
                <div className="track-selection">
                    track selection
                </div>
            </div>

            <button className="new-playlist-button">
                Submit
            </button>
        </div>
    )
}