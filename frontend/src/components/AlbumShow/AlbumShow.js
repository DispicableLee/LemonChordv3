import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchOneAlbum } from "../../store/albums";
import SingleTrack from "../SingleTrack/SingleTrack";
import './AlbumShow.css'

export default function AlbumShow({}){
    const dispatch = useDispatch()
    const {id} = useParams()
    const shownAlbum = useSelector(store=>store?.albums?.shownAlbum)
    let imageUrl = shownAlbum?.imageUrl
    let title = shownAlbum?.title
    let _id = shownAlbum?._id
    let shownAlbumUploader = shownAlbum?.uploader
    useEffect(()=>{
        dispatch(fetchOneAlbum(id))
    },[dispatch])
    

    const renderedAlbumTracks = shownAlbum?.tracks?.map((track, index)=>{
        return (
            <SingleTrack 
                key={track?._id} 
                title={track?.title}
                audioUrl = {track?.audioUrl}
                uploader = {shownAlbumUploader}
                album = {{
                    imageUrl,
                    title,
                    _id
                }}
                className="single-track-main"
                style={{ animationDelay: `${index * 0.1}s` }}
            />
        )
    })





    return (
        <div id="album-show-main">
            <div className="album-show-header">
                <div className="album-show-info">
                    <img src={imageUrl}/>
                    <h2>{title}</h2>
                </div>

                <div className="remove-album-hover">
                    X
                </div>



            </div>

            {renderedAlbumTracks}
        </div>
    )
}