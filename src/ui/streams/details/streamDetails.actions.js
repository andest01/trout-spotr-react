'use strict';
import { createAction, handleActions } from 'redux-actions';
import RegionGeometryService from 'api/streamRegions/RegionGeometryApiService';

// ------------------------------------
// Constants
// ------------------------------------
export const STREAM_ITEM_LOAD_STREAM = 'STREAM_ITEM_LOAD_STREAM';
export const STREAM_ITEM_SET_STREAM = 'STREAM_ITEM_SET_STREAM';

// ------------------------------------
// Actions
// ------------------------------------
export const loadingStream = createAction(STREAM_ITEM_LOAD_STREAM);
export const setStream = createAction(STREAM_ITEM_SET_STREAM);

// ------------------------------------
// Constants
// ------------------------------------

const DEFAULT_STREAM_STATE = {
  isLoading: true,
  streamId: -1,
  stateId: -1,
  stream: {},
  streamGeometry: {},
  publiclyAccessibleLandGeometry: {},
  accessPointsGeometry: {},
  specialRegulationsGeometry: {},
  regionId: -1,
  routeUrl: ''
};

export const loadStream = (stateId, regionId) => {
  return (dispatch, getState) => {
    dispatch(loadingStream());
    RegionGeometryService.getRegion(stateId, regionId)
      .then((model) => dispatch(setStream(model)));
  };
};

export const actions = {
  loadStream
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [STREAM_ITEM_LOAD_STREAM]: (state, { payload }) => state,
  [STREAM_ITEM_SET_STREAM]: (state, { payload }) => state
}, DEFAULT_STREAM_STATE);
