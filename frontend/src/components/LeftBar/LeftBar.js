import React from "react";
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import './LeftBar.css'
export default function LeftBar() {
  const currentUser = useSelector(store=>store?.session?.user)
  const currentUserPlaylists = useSelector(store=>store?.session?.user?.playlists)
  console.log(currentUserPlaylists)
  const dummyPlaylists = [1,2,3,4,5,6,7,8]

  const playlistList = currentUserPlaylists.map((playlist)=>{
    return (
      <div key={playlist} className="playlist-list-item">
        <p>{playlist.title}</p>
      </div>
    )
  })


  return (
    <aside id="left-bar">

      <div className="album-track-index-icons">
        <Link to="/albums" >
          <AlbumRoundedIcon/>
        </Link>
        <Link to="/tracks">
          <AudiotrackRoundedIcon />
        </Link>
      </div>
      <div className="playlist-list-main">
        {playlistList}
      </div> 

      <Link className="profile-button"
        to={`/profile/${currentUser._id}`}
      >
      </Link>

    </aside>
  );
}
