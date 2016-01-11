import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';
import counter from './modules/counter';
import streamList from 'ui/streams/streams.actions';

export default combineReducers({
  counter,
  router,
  streamList
});
