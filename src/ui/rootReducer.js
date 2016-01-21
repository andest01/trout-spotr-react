import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';
// import counter from './modules/counter';
import streamList from 'ui/streams/streams.actions';
import streamDetails from 'ui/streams/details/streamDetails.actions';

export default combineReducers({
  router,
  streamList,
  streamDetails
});
