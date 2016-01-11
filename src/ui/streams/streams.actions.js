'use strict';
import { createAction, handleActions } from 'redux-actions';
import TableOfContentsApi from 'api/tableOfContents/TableOfContentsApi';

// ------------------------------------
// Constants
// ------------------------------------
export const STREAMS_SET_STREAMS = 'STREAMS_SET_STREAMS';
export const STREAMS_SELECT_STREAM = 'STREAMS_SELECT_STREAM';
export const STREAMS_SELECT_REGION = 'STREAMS_SELECT_REGION';

// ------------------------------------
// Actions
// ------------------------------------
export const setStreams = createAction(STREAMS_SET_STREAMS);
export const selectStream = createAction(STREAMS_SELECT_STREAM);
export const selectRegion = createAction(STREAMS_SELECT_REGION);

// ------------------------------------
// Constants
// ------------------------------------
const DEFAULT_STREAM_SEARCH_STATE = {
  searchText: '',
  maxStreamLength: Infinity,
  minStreamLength: 0,
  maxPublicLength: Infinity,
  minPublicLength: 0,
  maxRoadCrossings: Infinity,
  minRoadCrossings: 0,
  maxPubliclyAccessibleRoadCrossings: Infinity,
  minPubliclyAccessibleRoadCrossings: 0,
  hasBrownTrout: true,
  hasBrookTrout: true,
  hasRainbowTrout: true
};

const DEFAULT_STREAM_STATE = {
  streamsGeoJSON: {},
  countiesGeoJSON: {},
  regionsGeoJSON: {},
  statesGeoJSON: {},
  selectedState: {},
  selectedRegion: {},
  tableOfContents: {},
  filter: DEFAULT_STREAM_SEARCH_STATE
};

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const loadStreams = () => {
  return (dispatch, getState) => {
    TableOfContentsApi.getData()
      .then((model) => dispatch(setStreams(model)));
  };
};

export const actions = {
  setStreams,
  loadStreams,
  selectStream,
  selectRegion
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [STREAMS_SET_STREAMS]:
    (state, { payload }) => {
      var tableOfContents = TableOfContentsApi.getTableOfContents(payload);
      return {
        ...state,
        streamsGeoJSON: payload.streams,
        countiesGeoJSON: payload.counties,
        statesGeoJSON: payload.state, // for now! :)
        regionsGeoJSON: payload.regions,
        tableOfContents: tableOfContents
      };
    },
  [STREAMS_SELECT_STREAM]:
    (state, { payload }) => state,
  [STREAMS_SELECT_REGION]:
    (state, { payload }) => {
      console.log('region selected', payload);
      return { ...state, selectedRegion: payload };
    }
}, DEFAULT_STREAM_STATE);
