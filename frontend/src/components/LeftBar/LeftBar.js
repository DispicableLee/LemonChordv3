import React from "react";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './LeftBar.css'
export default function LeftBar() {
  return (
    <aside id="left-bar">
      <Link to="/albums" >
        <Icon icon="game-icons:sound-waves" color="#e2e2e2" width="5vh" />
      </Link>
      <Link to="/tracks">
        <Icon icon="iconamoon:music-album-thin" color="#e2e2e2" height="5vh" />
      </Link>
    </aside>
  );
}
