// store/store.js
import sessionReducer from './session';
import usersReducer from './users';
import tracksReducer from './tracks';
import albumsReducer from './albums';
import errors from './errors'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    session: sessionReducer,
    users: usersReducer,
    tracks: tracksReducer,
    albums: albumsReducer,
    errors
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;