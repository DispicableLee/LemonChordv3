import React from "react";
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import './LeftBar.css'
export default function LeftBar() {
  const currentUser = useSelector(store=>store?.session?.user)
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

      <Link className="profile-button"
        to={`/profile/${currentUser._id}`}
      >
        
      </Link>

    </aside>
  );
}
