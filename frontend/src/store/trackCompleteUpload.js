import React, { useState } from "react";
import { uploadFile } from "react-s3";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
window.Buffer = window.Buffer || require("buffer").Buffer;

//====================== s3 upload ======================================
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_DIRECTORY = process.env.AWS_DIRECTORY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY_ID = process.env.AWS_SECRET_ACCESS_KEY_ID
const callId = localStorage.id
console.log(callId)

const config = {
  bucketName: AWS_S3_BUCKET_NAME,
  dirName: AWS_DIRECTORY,
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
};






// ================================== React Component Begins =========================================
export default function S3Upload ({setDisplayedSongs, displayedSongs}){
  const navigate = useNavigate()
  //========================= s3 file state ====================================
  const [selectedFile, setSelectedFile] = useState(null);
  //========================= mongoDB upload states ===========================
  const [trackTitle, setTrackTitle] = useState("");
  const [uploadBucket, setUploadBucket] = useState("");
  const [uploadKey, setUploadKey] = useState("");
  const [uploadLocation, setUploadLocation] = useState("");
  const [image, setImage] = useState("")

  //============================ s3 upload handlers ===================================


    function logAwsKey(){
        console.log(access)
    }






  const handleFileInput = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = async (file) => {
    uploadFile(file, config)
    .then((data)=>{
      console.log(data)
      console.log(data.bucket)
      console.log(data.key)
      console.log(data.location)
      

        const newTrackObj = {
            title: trackTitle,
            audioUrl: data.location,
            uploader: callId
        }







      const oldObj = {
          name: name,
          bucket: data.bucket,
          key: data.key,
          location: data.location,
          likes: [],
          userId: callId,
          image: image,
          comments: []
      }
      console.log(newObj)
      fetch(`http://localhost:4002/api/v2/endPoints/new/audio/${callId}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newObj)
      })
      .then((r)=>r.json())
      .then((json)=>{
        console.log(json)
        setDisplayedSongs([...displayedSongs, json])
      })

    })
    .catch((err) => console.error(err));
    
    navigate("/")

  };

  
//========================================= mongoDB api POST call =============================================





// ================================================================================================
// ============================= React Component Form Layouts =====================================
// ================================================================================================
  return (




    <div style={{
        alignItems: "center",
        justifyContent: "center"
    }}>
    {/* //   <div>React S3 File Upload</div>
    //   <br /> */}



      {/* <TextField ===========================Song Name / Image ==========
      label="Song Title"
      onChange={(e)=>setTrackTitle(e.target.value)}
      />
      <TextField  ================== Song Image =================
        label="image"
        onChange={(e)=>setImage(e.target.value)}
      /> */}






      {/* <Button  <===================== File Input Handler ============
        variant="contained" 
        component="label">
        Select File to Upload
        <input type="file" hidden onChange={handleFileInput} />
      </Button>
 */}





      {/* <Button ===================== File Upload =================
        variant="contained" 
        component="label" 
        onClick={() => handleUpload(selectedFile)}>
        Upload Song
      </Button> */}










    </div>
  );
};