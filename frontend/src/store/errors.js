import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { albumErrorsReducer } from './albums';
export default combineReducers({
  session: sessionErrorsReducer,
  album: albumErrorsReducer
});