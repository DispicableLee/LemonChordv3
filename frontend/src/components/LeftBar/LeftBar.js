import React from "react";
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import './LeftBar.css'
export default function LeftBar() {
  const currentUser = useSelector(store=>store?.session?.user)
  // console.log(currentUserPlaylists)
  const dummyPlaylists = [1,2,3,4,5,6,7,8]


  function showPlaylistId(playlist){
    console.log(playlist._id)
  }

  const playlistList = currentUser?.playlists.map((playlist)=>{
    return (
      <div 
        key={playlist} 
        className="playlist-list-item"
        onClick={()=>showPlaylistId(playlist)}
      >
        <p>{playlist.title}</p>
      </div>
    )
  })


  return (
    <aside id="left-bar">

      <div className="album-track-index-icons">
        <Link to="/albums" className="link-icon">
          <AlbumRoundedIcon/>
        </Link>
        <Link to="/tracks" className="link-icon">
          <AudiotrackRoundedIcon />
        </Link>
      </div>
      <div className="playlist-list-main">
        <Link to="/new_playlist_form" className="link-icon">
          <AddRoundedIcon/>
        </Link>
        {playlistList}
      </div> 

      <Link className="profile-button"
        to={`/profile/${currentUser._id}`}
      >
      </Link>

    </aside>
  );
}
