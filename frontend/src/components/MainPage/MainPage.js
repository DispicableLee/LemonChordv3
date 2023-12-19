import './MainPage.css'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import TracksIndex from '../TracksIndex/TracksIndex';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AlbumIndex from '../AlbumIndex/AlbumIndex';

function MainPage() {
  const history = useHistory()
  const [mainFeedSection, setMainFeedSection] = useState(1)
  const [onAlbumsIndex, setOnAlbumsIndex] = useState(false)


  function goToAlbumIndex(){
    console.log("hi")
    history.push("/albums")
  }
  return (
    <div id="main-page-main">
      <aside id="left-bar">
        <button 
          onClick={()=>setOnAlbumsIndex(false)}
          >
          <Icon icon="game-icons:sound-waves" 
            color="#e2e2e2" 
            width="5vh"
          />

        </button>
        <button 
          onClick={()=>setOnAlbumsIndex(true)}
        >
          <Icon icon="iconamoon:music-album-thin" 
            color="#e2e2e2" 
            height="5vh"
          />
        </button>
      </aside>

      <div id='main-feed-container'>
        {onAlbumsIndex ? <AlbumIndex/> : <TracksIndex/>}



      </div>

    </div>
  );
}

export default MainPage;