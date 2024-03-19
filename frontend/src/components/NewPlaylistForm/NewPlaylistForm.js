import React from "react";
import { useEffect, useState } from 'react';
import { fetchTracks } from "../../store/tracks";
import { createOnePlaylist } from "../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import './NewPlaylistForm.css'

export default function NewPlaylistForm(){
    const dispatch = useDispatch()
    const allTracks = useSelector(store=>store?.tracks)
    const currentUserId = useSelector(store=>store?.session?.user?._id)
    const [trackSelectModal, setTrackSelectModal] = useState(false)
    const [playlistTitle, setPlaylistTitle] = useState("")
    const [trackIdsToAdd, setTrackIdsToAdd] = useState([])


    useEffect(()=>{
        dispatch(fetchTracks())
    },[dispatch])


    useEffect(()=>{
        console.log(trackIdsToAdd)
    }, [trackIdsToAdd])

    function handlePlaylistCreation(){
        const playlistFormData = {
            title: playlistTitle,
            uploader: currentUserId,
            tracks: trackIdsToAdd
        }
        dispatch(createOnePlaylist(currentUserId, playlistFormData))
    }


    function handleTrackIdsToAdd(trackId){
          // Check if the trackId is already in the trackIdsToAdd array
        const index = trackIdsToAdd.indexOf(trackId);

        // If the trackId is not in the array, add it; otherwise, remove it
        if (index === -1) {
            setTrackIdsToAdd([...trackIdsToAdd, trackId]);
        } else {
            // Create a new array without the selected trackId
            const updatedTrackIds = [...trackIdsToAdd.slice(0, index), ...trackIdsToAdd.slice(index + 1)];
            setTrackIdsToAdd(updatedTrackIds);
        }
    }


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
                    <div className="close-track-select-modal"
                        onClick={()=>setTrackSelectModal(!trackSelectModal)}
                    >
                        X
                    </div>
                    <ul className="track-selection-ul">
                        {allTracks.map((track) => (
                        <li key={track.id}
                            className="track-select-item-input"
                            onClick={() => handleTrackIdsToAdd(track._id)}
                        >
                            <input
                                type="checkbox"
                                checked={trackIdsToAdd.includes(track._id)}
                                
                            />
                            <label>{track.title}</label>
                        </li>
                        ))}
                    </ul>
                    <div className="track-select-confirm"
                        onClick={()=>handlePlaylistCreation()}
                    >
                        <h2>Confirm</h2>
                    </div>
                </div>
            :
                <></>
            }
        </div>
    )
}