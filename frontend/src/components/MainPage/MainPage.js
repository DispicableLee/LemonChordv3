import './MainPage.css'
import { Icon } from '@iconify/react';
import { useState } from 'react';

function MainPage() {
  const [mainFeedSection, setMainFeedSection] = useState(1)
  return (
    <div id="main-page-main">
      <aside id="left-bar">

        <Icon icon="game-icons:sound-waves" 
          color="#e2e2e2" 
          width="5vh"
        />
        <Icon icon="iconamoon:music-album-thin" color="#e2e2e2" height="5vh"/>
      </aside>

      <div >





      </div>

      <footer>
        Copyright &copy; 2022 LemonChordv3
      </footer>
    </div>
  );
}

export default MainPage;