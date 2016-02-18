'use strict';
import {
  createAction, handleActions
}
from 'redux-actions';
import TableOfContentsApi from 'api/tableOfContents/TableOfContentsApi';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const STREAMS_SET_STREAMS = 'STREAMS_SET_STREAMS';

export const STREAMS_SELECT_STREAM = 'STREAMS_SELECT_STREAM';
export const STREAMS_SELECT_REGION = 'STREAMS_SELECT_REGION';
export const STREAMS_SELECT_STATE = 'STREAMS_SELECT_STATE';
export const STREAMS_SELECT_STATE_AND_REGION = 'STREAMS_SELECT_STATE_AND_REGION';

export const STREAMS_FILTER_STREAMS = 'STREAMS_FILTER_STREAMS';

// ------------------------------------
// Actions
// ------------------------------------
export const setStreams = createAction(STREAMS_SET_STREAMS);
export const selectStream = createAction(STREAMS_SELECT_STREAM);
export const selectRegion = createAction(STREAMS_SELECT_REGION);
export const selectState = createAction(STREAMS_SELECT_STATE);
export const selectStateAndRegion = createAction(STREAMS_SELECT_STATE_AND_REGION);
export const filterStreams = createAction(STREAMS_FILTER_STREAMS);

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
  selectedStream: {},
  tableOfContents: [],
  streamHash: [],
  streamsBySlug: {},
  stateHash: {},
  regionHash: {},
  filter: DEFAULT_STREAM_SEARCH_STATE
};

export const loadStreams = ({stateId, regionId, streamId}) => {
  return (dispatch, getState) => {
    return TableOfContentsApi.getData()
      .then(model => {
        dispatch(setStreams({model, stateId, regionId, streamId}));
        return model;
      }).catch(error => {
        console.log('a terrible problem occured', error);
      });
  };
};

export const actions = {
  setStreams,
  loadStreams,
  selectStream,
  selectRegion,
  filterStreams,
  selectState,
  selectStateAndRegion
};

// ------------------------------------
// Reducer
// ------------------------------------

var actionHandlers = {
  [STREAMS_SET_STREAMS]: (state, { payload }) => {
    let { model, stateId, regionId, streamId } = payload;
    let tableOfContents = TableOfContentsApi.getTableOfContents(model);
    let streamData = {
      streamsGeoJSON: model.streams,
      countiesGeoJSON: model.counties,
      statesGeoJSON: model.state, // for now! :)
      regionsGeoJSON: model.regions,
      tableOfContents: tableOfContents.states,
      streamHash: tableOfContents.streams,
      streamsBySlug: tableOfContents.streamsBySlug,
      stateHash: _.keyBy(tableOfContents.states, 'shortName'),
      regionHash: _.keyBy(tableOfContents.regions, 'shortName')
    };

    let composedState = Object.assign({}, state, streamData);
    let selectedStateAndRegion = {};
    if (streamId != null) {
      selectedStateAndRegion = actionHandlers[STREAMS_SELECT_STREAM](composedState, {payload: {stateId, regionId, streamId}});
    } else if (regionId != null) {
      selectedStateAndRegion = actionHandlers[STREAMS_SELECT_REGION](composedState, {payload: {stateId, regionId}});
    } else if (stateId != null) {
      selectedStateAndRegion = actionHandlers[STREAMS_SELECT_REGION](composedState, {payload: {stateId}});
    } else {

    }
    // let selectedStateAndRegion = actionHandlers[STREAMS_SELECT_STATE](composedState, {payload: {stateId, regionId} });
    let finalState = Object.assign({}, composedState, selectedStateAndRegion);
    return finalState;
  },
  [STREAMS_SELECT_STREAM]: (state, { payload }) => {
    // let newState = {
    //   selectedStream: DEFAULT_STREAM_STATE.selectedStream
    // };
    let newState = actionHandlers[STREAMS_SELECT_REGION](state, {payload});
    if (payload.streamId == null) {
      return newState;
    }

    // let names = payload.streamId.split('@');

    // let streamId = _.lowerCase(names[0]) + '@' + names[1];
    let streamId = payload.streamId;
    let isStream = _.has(state.streamsBySlug, streamId);
    if (isStream) {
      newState.selectedStream = state.streamsBySlug[streamId];
    }

    let composedState = Object.assign({}, state, newState);
    return composedState;
  },
  [STREAMS_SELECT_REGION]: (state, { payload }) => {
    // let newState = {
    //   selectedRegion: DEFAULT_STREAM_STATE.selectedRegion,
    //   selectedStream: DEFAULT_STREAM_STATE.selectedStream
    // };
    let newState = actionHandlers[STREAMS_SELECT_STATE](state, {payload});
    let regionId = _.lowerCase(payload.regionId);
    let isRegion = _.has(state.regionHash, regionId);
    if (isRegion) {
      newState.selectedRegion = state.regionHash[regionId];
    }
    let composedState = Object.assign({}, state, newState);
    return composedState;
  },
  [STREAMS_SELECT_STATE]: (state, { payload }) => {
    let newState = {
      selectedState: DEFAULT_STREAM_STATE.selectedState,
      selectedRegion: DEFAULT_STREAM_STATE.selectedRegion,
      selectedStream: DEFAULT_STREAM_STATE.selectedStream
    };
    let stateId = _.lowerCase(payload.stateId);
    let regionId = _.lowerCase(payload.regionId);
    if (stateId != null && _.has(state.stateHash, stateId)) {
      // attempt to select the actual state.
      newState.selectedState = state.stateHash[stateId];
    } if (stateId != null && regionId != null && _.has(state.regionHash, regionId)) {
      // attempt to select the actual region.
      newState.selectedRegion = state.regionHash[regionId];
    }

    let composedState = Object.assign({}, state, newState);
    return composedState;
  },
  [STREAMS_FILTER_STREAMS]: (state, { payload }) => {
    let newFilter = _.lowerCase(payload || '');
    let { filter } = state;
    filter = { ...filter, searchText: newFilter };
    return { ...state, filter };
  }
};
export default handleActions(actionHandlers, DEFAULT_STREAM_STATE);
