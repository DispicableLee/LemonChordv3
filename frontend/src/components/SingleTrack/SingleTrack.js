import React from "react"
import './SingleTrack.css'

export default function SingleTrack({title}){
    return (
        <div id="single-track-main">
            <div className="play-button">

            </div>
                <h2 className="track-title">{title}</h2>
        </div>
    )
}