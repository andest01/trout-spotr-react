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

export const STREAMS_FILTER_STREAMS = 'STREAMS_FILTER_STREAMS';

// ------------------------------------
// Actions
// ------------------------------------
export const setStreams = createAction(STREAMS_SET_STREAMS);
export const selectStream = createAction(STREAMS_SELECT_STREAM);
export const selectRegion = createAction(STREAMS_SELECT_REGION);
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
  tableOfContents: [],
  streamHash: [],
  filter: DEFAULT_STREAM_SEARCH_STATE
};

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
  selectRegion,
  filterStreams
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [STREAMS_SET_STREAMS]:
  (state, {
    payload
  }) => {
    var tableOfContents = TableOfContentsApi.getTableOfContents(payload);
    return {
      ...state,
      streamsGeoJSON: payload.streams,
      countiesGeoJSON: payload.counties,
      statesGeoJSON: payload.state, // for now! :)
      regionsGeoJSON: payload.regions,
      tableOfContents: tableOfContents.states,
      streamHash: tableOfContents.streams
    };
  }, [STREAMS_SELECT_STREAM]:
  (state, {
    payload
  }) => state, [STREAMS_SELECT_REGION]:
  (state, {
    payload
  }) => {
    return {...state, selectedRegion: payload
    };
  }, [STREAMS_FILTER_STREAMS]: (state, { payload }) => {
    let newFilter = _.lowerCase(payload || '');
    let { filter } = state;

    // var filteredStreams = _(state.streamHash).map(stream => {
    //   let isVisible = true;
    //   if (stream.name == null || stream.name.length === 0) {
    //     isVisible = true;
    //   } else {
    //     isVisible = stream.name.toLowerCase().indexOf(newFilter) >= 0;
    //   }
    //   stream.visible = isVisible;
    //   return stream;
    // }).value();

    filter = { ...filter, searchText: newFilter };
    return { ...state, filter };
  }
}, DEFAULT_STREAM_STATE);
