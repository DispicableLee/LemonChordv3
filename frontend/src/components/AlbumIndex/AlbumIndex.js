import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumCard from "./AlbumCard";
import { fetchAlbums, uploadNewAlbum } from "../../store/albums";
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
        const albumFormData = new FormData();
        albumFormData.append('title', newAlbumTitle);
        albumFormData.append('uploader', uploaderId);
        albumFormData.append('image', newAlbumImage);
        dispatch(uploadNewAlbum(albumFormData))
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
                        type="file"
                        accept="image/*" // This ensures only image files can be selected
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setNewAlbumImage(URL.createObjectURL(file))
                        }}
                    />
                    <input type="Submit"/>

                </form>

            </div>
            <div id='albums-index-container'>
                <div className="new-album-modal-switch"
                    onClick={()=>setNewAlbumModal(!newAlbumModal)}
                >
                    <h2>create neww Album</h2>
                </div>
                {renderedAlbums}

            </div>
        </div>
    )
}