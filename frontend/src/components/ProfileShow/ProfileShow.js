import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getOneUser } from "../../store/users";
import TrackUpload from "./TrackUpload";
import './ProfileShow.css'


export default function ProfileShow(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const shownUser = useSelector(store=>store?.users?.shownUser)
    // console.log(shownUser.username)
    console.log(id)

    useEffect(()=>{
        dispatch(getOneUser(id))
    },[dispatch])



    return (
        <div id="profile-show-main">
            <div className="profile-header">
                <h1>{shownUser?.username}</h1>
            </div>
            <div className="profile-content-main">
                {id === shownUser?._id 
                ? 
                    <TrackUpload/>
                : 
                    <></>
                }
                <div className="user-stats-main">

                    <div className="user-stats">
                        <div className="user-content-stats">
                            <div className="user-stat-box">
                                <h1>{shownUser?.playlists.length}</h1>
                                <h4>Playlists</h4>
                            </div>
                            <div className="user-stat-box">
                                <h1>{shownUser?.tracks.length}</h1>
                                <h4>Tracks</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}