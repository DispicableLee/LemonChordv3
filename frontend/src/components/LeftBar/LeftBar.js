import React from "react";
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { fetchOnePlaylist } from "../../store/playlists";
import './LeftBar.css'
import { style } from "dom-helpers";
export default function LeftBar() {
  const dispatch = useDispatch()
  const currentUser = useSelector(store=>store?.session?.user)
  // console.log(currentUserPlaylists)

  const playlistList = currentUser?.playlists.map((playlist)=>{
    return (
      <Link to={`/playlist-show/${playlist._id}`}
        className="playlist-list-item"
      >
        <div 
          key={playlist} 
          // className="playlist-list-item"
        >
          <p>{playlist.title}</p>
        </div>
      </Link>
    )
  })


  return (
    <aside id="left-bar">

      <div className="album-track-index-icons">

{/* ================ Album Index ============================= */}
        <Link to="/albums" className="link-icon">
          <AlbumRoundedIcon/>
        </Link>
{/* ================ Track Index ============================= */}
        <Link to="/tracks" className="link-icon">
          <AudiotrackRoundedIcon />
        </Link>


      </div>

      <div className="playlist-list-main">
        <Link to="/new_playlist_form" className="link-icon-add">
          <AddRoundedIcon/>
        </Link>
        <div className="playlist-list">
          {playlistList}
        </div>
      </div> 

      <Link className="profile-button"
        to={`/profile/${currentUser._id}`}
      >
      </Link>

    </aside>
  );
}
