import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './ProfileShow.css'


export default function ProfileShow(){
    const {id} = useParams()
    console.log(id)
    return (
        <div id="profile-show-main">
            <h1>profile-show</h1>
        </div>
    )
}