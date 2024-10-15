import React from "react"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { recieveCurrentTrack } from "../../store/session"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SvgIcon } from "@mui/material";
import './SingleTrack.css'

export default function SingleTrack({_id, title, audioUrl, uploader, album, style}){
    const dispatch = useDispatch()


    function setCurrentTrack(){
        let trackObj = {
            _id,
            title,
            audioUrl,
            uploader,
            album
        }
        dispatch(recieveCurrentTrack(trackObj))
    }


    function GradientFavoriteIcon(props) {
        return (
            <SvgIcon viewBox="0 0 24 24" {...props}>
            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#1BA2B1', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'rgba(251, 216, 127, 0.57)', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#e2e2e2"
                stroke="url(#gradient1)"  // Reference the gradient for the stroke
                strokeWidth="2"
            />
            </SvgIcon>
        );
    }







    return (
        <div id="single-track-main"
            // onClick={setCurrentTrack}
            style={style}
        >
            <div className="play-button"
                onClick={setCurrentTrack}
            >
            </div>
            <div className="title-artist">
                <h3 className="track-title">{title}</h3>
                <h5>{uploader.username}</h5>
            </div>
            <GradientFavoriteIcon className="like-button" />
        </div>
    )
}