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


    const flexWrappedUserStats = function(){
        return (
            <div className="user-stat-box">
                <div className="user-stat-card">
                    <h1>{shownUser?.albums.length}</h1>
                    <h4>Albums</h4>
                </div>
                <div className="user-stat-card">
                    <h1>{shownUser?.albums.length}</h1>
                    <h4>Albums</h4>
                </div>
                <div className="user-stat-card">
                    <h1>{shownUser?.tracks.length}</h1>
                    <h4>Tracks</h4>
                </div>
            </div>
        )
    }



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
                        <div className="user-stat-box">
                            <div className="user-stat-card">
                                <h1>{shownUser?.albums.length}</h1>
                                <h4>Albums</h4>
                            </div>
                            <div className="user-stat-card">
                                <h1>{shownUser?.playlists.length}</h1>
                                <h4>Playlists</h4>
                            </div>
                            <div className="user-stat-card">
                                <h1>{shownUser?.tracks.length}</h1>
                                <h4>Tracks</h4>
                            </div>
                        </div>  


                        <div className="user-info">
                            <div className="username">
                                <h1>
                                    {shownUser?.username}
                                </h1>
                            </div>
                            <div className="links">
                                Instagram
                                <br/>
                                LinkedIn
                                <br/>
                                GitHub
                                <br/>
                                
                            </div>  
                        </div>




                    </div>

                    <section className="right-nav">

                    </section>





                </div>
            </div>
        </div>
    )
}