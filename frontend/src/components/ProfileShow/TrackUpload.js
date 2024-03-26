import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { uploadFile } from "react-s3";
import { S3 } from "aws-sdk";
import { Button } from "@mui/material";
import { postNewTrack } from "../../store/tracks";
import { useState, useEffect } from "react";
import './ProfileShow.css'
export default function TrackUpload(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const isLight = useSelector(store=>store?.session?.isLight)
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("")
    // ================== AWS upload enviroment variables ===========================
    const AWS_S3_BUCKET_NAME = process.env.REACT_APP_AWS_S3_BUCKET_NAME;
    const AWS_DIRECTORY = process.env.REACT_APP_AWS_DIRECTORY;
    const AWS_REGION = process.env.REACT_APP_AWS_REGION;
    const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
    const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
    const s3 = new S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: AWS_REGION,
    });
    // console.log(AWS_ACCESS_KEY_ID)
    // const config = {
    //     bucketName: AWS_S3_BUCKET_NAME,
    //     dirName: AWS_DIRECTORY,
    //     region: AWS_REGION,
    //     accessKeyId: AWS_ACCESS_KEY_ID,
    //     secretAccessKey: AWS_SECRET_ACCESS_KEY,
    // };


    // useEffect(()=>{
    //     let uploadFileButton = document.getElementById("upload-file-button")
    //     let uploadFileInput = document.getElementById("upload-file-input")
    //     uploadFileButton.addEventListener("click",()=> uploadFileInput.click())
    // },[])





    const handleFileInput = (e) => {
        console.log(e.target.files[0].name);
        setSelectedFile(e.target.files[0]);
        setSelectedFileName(e.target.files[0].name)
    };

    const handleUpload = async (file) => {

        const params = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: `${AWS_DIRECTORY}/${selectedFileName}`,
            Body: file,
        };
        try {
            const data = await s3.upload(params).promise();
            console.log('File uploaded successfully:', data.Location);
            // Dispatch action or perform further processing
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error
        }
    // navigate("/")

  };










    return (
        <div id="song-upload-main"
            className={isLight ? "" : "dark"}
        >
            <h2>Upload New Track</h2>
                    <input type="file" 
                        id="upload-file-input"
                        // hidden
                        onChange={(e)=>handleFileInput(e)} 
                    />
                    {selectedFile && <h2>{selectedFileName}</h2>}
                    <button id="upload-file-confim-button"
                        onClick={()=>handleUpload(selectedFile)}
                    >
                        Confirm
                    </button>

        </div>
    )
}