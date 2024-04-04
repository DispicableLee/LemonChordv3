import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { uploadFile } from "react-s3";
import { S3 } from "aws-sdk";
import AWS from "aws-sdk"
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

 const uploadFile = async () => {

    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: AWS_S3_BUCKET_NAME },
      region: AWS_REGION,
    });

    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: selectedFileName,
      Body: selectedFile,
    };

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      alert("File uploaded successfully.");
      console.log(data)
    });
  };










    return (
        <div id="song-upload-main"
            className={isLight ? "" : "dark"}
        >
            <h2>Upload New Track</h2>
                    <input type="file" 
                        id="upload-file-input"
                        title=" "
                        hidden
                        onChange={(e)=>handleFileInput(e)} 
                    />
                    {selectedFile && <h2>{selectedFileName}</h2>}
                    <button id="upload-file-confim-button"
                        onClick={uploadFile}
                    >
                        Confirm
                    </button>

        </div>
    )
}