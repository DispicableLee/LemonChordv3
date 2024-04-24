import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { IconButton} from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { removeCurrentTrack, playPreviousTrack, playNextTrack } from '../../store/session';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import "./AudioFooter.css"



export default function AudioFooter(){
    const dispatch = useDispatch()
    const currentTrack = useSelector(store=>store?.session?.currentTrack)
    // console.log(currentTrack)
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const [isReady, setIsReady] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);


    let audioRef = useRef(null)
          // New function for formatting time
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };



    const handleSkipForward = () => {
        dispatch(playNextTrack(currentTrack._id));
    };


    useEffect(()=>{
        let audioElement = audioRef.current
        if(currentTrack && audioElement){
            audioElement.src = currentTrack.audioUrl
            audioElement.load()
        }
        const updateProgress = () => {
            const currentProgress = (audioElement?.currentTime / audioElement?.duration) * 100;
            setProgress(currentProgress);
        };
        audioElement.addEventListener('timeupdate', updateProgress);
        return () => {
            audioElement.removeEventListener('timeupdate', updateProgress);
        };
    },[currentTrack])

    const togglePlayPause = () => {
        if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
        } else {
        audioRef.current?.play();
        setIsPlaying(true);
        }
    };

    const handleSeek = (e) => {
        const seekPosition = (e.nativeEvent.offsetX / e.target.clientWidth) * audioRef?.current.duration;
        audioRef.current.currentTime = seekPosition;
    };




    return (
        <div id="audio-footer-main">



            <audio
                id="audio"
                ref={audioRef}
                preload="metadata"
                onDurationChange={(e) => setDuration(e.currentTarget.duration)}
                onCanPlay={(e) => setIsReady(true)}
                onPlaying={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                autoPlay
            >
                <source type="audio/mpeg" src={currentTrack?.audioUrl} />
            </audio>
        {currentTrack && 
            <>
            <div className='remove-track'
                onClick={()=>dispatch(removeCurrentTrack())}
                >
                <CloseRoundedIcon/>
            </div>
            <div id="controls-progress">
                <div className="backwards-pause-forwards">
                    <IconButton onClick={()=>dispatch(playPreviousTrack(currentTrack?._id))} disabled={!isReady} style={{color: "white"}}>
                        <SkipPreviousIcon />
                    </IconButton>
                    <button
                        disabled={!isReady}
                        onClick={togglePlayPause}
                    > 
                            {isPlaying ? <PauseIcon/> :<PlayArrowIcon/>}
                    </button> 
                    <IconButton onClick={()=>dispatch(playNextTrack(currentTrack?._id))} disabled={!isReady} style={{color: "white"}}>
                        <SkipNextIcon />
                    </IconButton>
                </div>
                {/* ⁡⁢⁣⁢progress bar⁡ */}
                <section className="progress-bar-holder">
                    
                    <h4>{formatTime(audioRef.current?.currentTime)}</h4>
                    
                    <div className="progress-bar-wrapper" onClick={handleSeek}>
                        <div
                            className="progress-bar"
                        
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    {/* Use the formatTime function for displaying duration */}
                    <h4>{formatTime(audioRef.current?.duration)}</h4>
                        
                </section>
                {currentTrack?.title} - 
                <Link to={`/album/${currentTrack?.album?._id}`}>
                    {currentTrack?.album?.title}
                </Link>
            </div>
            <div className='song-info'>
                    
            </div>
            </>
        }


        </div>
    )
}