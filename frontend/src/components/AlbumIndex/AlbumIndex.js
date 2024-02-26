import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumCard from "./AlbumCard";
import { fetchAlbums, uploadNewAlbum, clearAlbumErrors } from "../../store/albums";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./AlbumIndex.css"
export default function AlbumIndex(){
    const dispatch = useDispatch()
    const history = useHistory()
//======================== new album form info ===============================
    const [newAlbumModal, setNewAlbumModal] = useState(false)
    const [newAlbumTitle, setNewAlbumTitle] = useState('')
    const [newAlbumImage, setNewAlbumImage] = useState('')
    const [newAlbumTracks, setNewAlbumTracks] = useState([])
    const uploaderId = useSelector(store=>store?.session?.user?._id)
    const allAlbums = useSelector(store=>store?.albums?.all)
    // console.log(allAlbums)
    useEffect(()=>{
        dispatch(clearAlbumErrors())
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


    function handleSubmitAlbum(e){
        e.preventDefault()
        const newAlbumObj = {
            title: newAlbumTitle,
            imageUrl: newAlbumImage,
            uploader: uploaderId
        }

        dispatch(uploadNewAlbum(newAlbumObj))
    }





    return (
        <div id='album-index-main'>


            <h1>album index</h1>
            <div id="new-album-modal"
                className={newAlbumModal ? '' : 'inactive'}
            >
                <img src={newAlbumImage}/>

                <form onSubmit={handleSubmitAlbum}>
                    <h1>Create New Album</h1>
                    <input type="text"
                        onChange={(e)=>setNewAlbumTitle(e.target.value)}
                        placeholder="Title"
                    />

                    <input
                        type="text"
                        placeholder="image url"
                        onChange={(e)=>setNewAlbumImage(e.target.value)}
                    />
                    <input type="Submit"/>

                </form>

            </div>
            <div id='albums-index-container'>
                <div className="new-album-modal-switch"
                    onClick={()=>{
                        
                        setNewAlbumModal(!newAlbumModal)
                    }}
                >
                    <h2>create neww Album</h2>
                </div>
                {renderedAlbums}

            </div>
        </div>
    )
}