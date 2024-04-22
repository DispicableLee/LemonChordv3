import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import { fetchOneAlbum, deleteAlbum, fetchAlbums } from "../../store/albums";
import SingleTrack from "../SingleTrack/SingleTrack";
import './AlbumShow.css'

export default function AlbumShow({}){
    const history = useHistory()
    const dispatch = useDispatch()
    const {id} = useParams()
    const shownAlbum = useSelector(store=>store?.albums?.shownAlbum)
    const [removeHover, setRemoveHover] = useState(false)
    const [deleteAlbumModal, setDeleteAlbumModal] = useState(false)
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


    function handleDeleteAlbum(id){
        dispatch(deleteAlbum(id))
    }



    return (
        <div id="album-show-main" >
            <div className={deleteAlbumModal ? "album-show-header-modal" : "album-show-header"}>
                <div className="album-show-info">
                    <img src={imageUrl}/>
                    <div className="title-artist-header">
                        <h2>{title}</h2>
                        <h5>{shownAlbumUploader?.username}</h5>
                    </div>
                </div>

                <div id="remove-album"
                    className={removeHover ? "active" : ""}
                    onMouseEnter={()=>setRemoveHover(true)}
                    onMouseLeave={()=>setRemoveHover(false)}
                >
                    <h3
                        onClick={()=>setDeleteAlbumModal(true)}
                    >
                        Delete Album
                    </h3>
                </div>
                <div className="remove-album-hover"
                    onMouseEnter={()=>setRemoveHover(true)}
                    onMouseLeave={()=>setRemoveHover(false)}
                >
                    <h3 className="hover-button-text">X</h3>
                </div>


            </div>
                {deleteAlbumModal 
                ?             
                    <div id="delete-album-modal">
                        <h3>You are about to delete this album. Are you sure?</h3>
                        <button
                            onClick={()=>{
                                handleDeleteAlbum(id)
                                history.push("/albums")
                            }}
                        >
                            Yes, Delete this Album
                        </button>
                        <button className="cancel-delete-button"
                            onClick={()=>setDeleteAlbumModal(false)}
                        >
                            Cancel
                        </button>
                    </div> 
                : <></>
                }
            <div className={deleteAlbumModal ? "track-display-modal" : "track-display"}>
                {renderedAlbumTracks}

            </div>
        </div>
    )
}