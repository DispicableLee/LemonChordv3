import './MainPage.css'
import { Icon } from '@mui/material';
import { useState } from 'react';
import LeftBar from '../LeftBar/LeftBar';
import TracksIndex from '../TracksIndex/TracksIndex';
import AlbumIndex from '../AlbumIndex/AlbumIndex';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import AlbumShow from '../AlbumShow/AlbumShow';

function MainPage() {
  return (
    <div id="main-page-main">
      <LeftBar/>
      <div id='main-feed-container'>
        <Switch>
          <Route exact path="/albums" component={AlbumIndex}/>
          <Route exact path="/tracks" component={TracksIndex}/>
          <Route exact path= "/album/:id" component={AlbumShow}/>
        </Switch>
      </div>
    </div>
  );
}

export default MainPage;