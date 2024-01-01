import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './AlbumCard.css'

export default function AlbumCard({key, id, imageUrl, title, uploader}){
    const history = useHistory()
    return (
        <Link id="album-card-main" to={`/album/${id}`}>
            <div>
                <img src={imageUrl}/>
                <h3>{title}</h3>
                <h4>{uploader.username}</h4>
            </div>
        </Link>
    )
}