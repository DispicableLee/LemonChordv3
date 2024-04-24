import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar.js/SearchBar";
import { fetchTracks } from "../../store/tracks";
import { useDispatch, useSelector } from "react-redux";
import SingleTrack from "../SingleTrack/SingleTrack";
import { recieveIndexPlayfeed } from "../../store/session";
import './TracksIndex.css'

export default function TracksIndex() {
    const dispatch = useDispatch();
    const fetchedTracks = useSelector(store => store?.tracks);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        dispatch(fetchTracks());
    }, [dispatch]); 

    useEffect(() => {
        if (fetchedTracks) {
            setTracks(fetchedTracks);
            dispatch(recieveIndexPlayfeed(fetchedTracks));
        }
    }, [fetchedTracks, dispatch]);


    const renderedTracks = tracks?.map((track) => (
        <SingleTrack 
            key={track._id} 
            _id={track._id} 
            title={track.title}
            audioUrl={track.audioUrl}
            uploader={track.uploader}
            album={track.album}
        />
    ));

    return (
        <div id="tracks-index-main">
            <SearchBar 
                tracks={tracks}
                setTracks={setTracks}
                fetchedTracks={fetchedTracks}
            />
            <div>{renderedTracks}</div>
        </div>
    );
}
