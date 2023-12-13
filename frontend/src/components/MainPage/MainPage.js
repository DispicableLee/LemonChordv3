import './MainPage.css'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import TracksIndex from '../TracksIndex/TracksIndex';

function MainPage() {
  const [mainFeedSection, setMainFeedSection] = useState(1)
  return (
    <div id="main-page-main">
      <aside id="left-bar">

        <Icon icon="game-icons:sound-waves" 
          color="#e2e2e2" 
          width="5vh"
        />
        <Icon icon="iconamoon:music-album-thin" 
          color="#e2e2e2" 
          height="5vh"
        />
      </aside>

      <div id='main-feed-container'>
        <TracksIndex/>



      </div>

    </div>
  );
}

export default MainPage;