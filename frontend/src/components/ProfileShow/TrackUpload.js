import React from "react";
import { uploadFile } from "react-s3";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import './ProfileShow.css'
export default function TrackUpload(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("")



    useEffect(()=>{
        let uploadFileButton = document.getElementById("upload-file-button")
        let uploadFileInput = document.getElementById("upload-file-input")
        uploadFileButton.addEventListener("click",()=> uploadFileInput.click())
    },[])





    const handleFileInput = (e) => {
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    };
    return (
        <div className="song-upload-main">
            <h2>Upload New Track</h2>
                {selectedFile && <h2>file selected</h2>}
                    <input type="file" 
                        id="upload-file-input"
                        hidden
                        onChange={handleFileInput} 
                    />
                <button id="upload-file-button">
                    Upload file
                </button>
        </div>
    )
}