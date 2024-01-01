import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumCard from "./AlbumCard";
import { fetchAlbums } from "../../store/albums";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./AlbumIndex.css"
export default function AlbumIndex(){
    const dispatch = useDispatch()
    const history = useHistory()
    const allAlbums = useSelector(store=>store?.albums?.all)
    console.log(allAlbums)
    useEffect(()=>{
        dispatch(fetchAlbums())
    },[dispatch])


    const renderedAlbums = allAlbums?.map((album)=>{
        return(
            <AlbumCard
                key={album._id}
                id={album._id}
                imageUrl = {album.imageUrl}
                title={album.title}
                uploader = {album.uploader}
            />
        )
    })





    return (
        <div id="album-index-main">
            <h1>album index</h1>
            {renderedAlbums}
        </div>
    )
}