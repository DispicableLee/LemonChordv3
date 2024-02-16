import './MainPage.css'
import { Icon } from '@mui/material';
import { useState } from 'react';
import LeftBar from '../LeftBar/LeftBar';
import TracksIndex from '../TracksIndex/TracksIndex';
import AlbumIndex from '../AlbumIndex/AlbumIndex';
import AlbumShow from '../AlbumShow/AlbumShow';
import ProfileShow from '../ProfileShow/ProfileShow';
import NewPlaylistForm from '../NewPlaylistForm/NewPlaylistForm';
import PlaylistShow from '../PlaylistShow/PlaylistShow';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

function MainPage() {
  return (
    <div id="main-page-main">
      <LeftBar/>
      <div id='main-feed-container'>
        <Switch>
          <Route exact path="/albums" component={AlbumIndex}/>
          <Route exact path="/tracks" component={TracksIndex}/>
          <Route exact path="/new_playlist_form" component={NewPlaylistForm}/>
          <Route exact path="/playlist-show/:id" component={PlaylistShow}/>
          <Route exact path= "/album/:id" component={AlbumShow}/>
          <Route exact path="/profile/:id" component={ProfileShow}/>
        </Switch>
      </div>
    </div>
  );
}

export default MainPage;