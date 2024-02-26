import React from "react";
import './NewPlaylistForm.css'

export default function NewPlaylistForm(){
    return (
        <div id="new-playlist-form-main">
            New Playlist Form
            <form id="playlist-form" className="form">

                <input type="text"
                    
                />



                <input type="submit" 
                    value="Create Playlist" 
                    id="playlist-form" 
                    className="submit"
                
                />
            </form>
        </div>
    )
}