import React from "react";
import { Icon } from "@mui/material";
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './LeftBar.css'
export default function LeftBar() {
  return (
    <aside id="left-bar">
      <Link to="/albums" >
        <AlbumRoundedIcon/>
      </Link>
      <Link to="/tracks">
        <AudiotrackRoundedIcon />
      </Link>
    </aside>
  );
}
