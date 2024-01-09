import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchOneAlbum } from "../../store/albums";
import SingleTrack from "../SingleTrack/SingleTrack";

export default function AlbumShow(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const shownAlbum = useSelector(store=>store?.albums?.shownAlbum)
    let shownAlbumImage = shownAlbum?.imageUrl
    let shownAlbumTitle = shownAlbum?.title
    let shownAlbumId = shownAlbum?._id
    let shownAlbumUploader = shownAlbum?.uploader
    useEffect(()=>{
        dispatch(fetchOneAlbum(id))
    },[dispatch])
    

    const renderedAlbumTracks = shownAlbum?.tracks?.map((track)=>{
        return (
            <SingleTrack 
                key={track?._id} 
                title={track?.title}
                audioUrl = {track?.audioUrl}
                uploader = {shownAlbumUploader}
                album = {{
                    shownAlbumImage,
                    shownAlbumTitle,
                    shownAlbumId
                }}
            />
        )
    })





    return (
        <div style={{border: "1px solid white"}}>
            <h1>Album Show</h1>
            {renderedAlbumTracks}
        </div>
    )
}