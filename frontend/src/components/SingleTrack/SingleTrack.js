import React from "react"
import { useDispatch } from "react-redux"
import { recieveCurrentTrack } from "../../store/session"
import './SingleTrack.css'

export default function SingleTrack({title, audioUrl, uploader}){
    const dispatch = useDispatch()
    // console.log(uploader)




    function setCurrentTrack(){
        let trackObj = {
            title,
            audioUrl,
            uploader
        }
        dispatch(recieveCurrentTrack(trackObj))
    }







    return (
        <div id="single-track-main"
            onClick={setCurrentTrack}
        >
            <div className="play-button">

            </div>
                <div className="title-artist">
                    <h3 className="track-title">{title}</h3>
                    <h5>{uploader.username}</h5>
                </div>
        </div>
    )
}