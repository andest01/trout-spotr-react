import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import CoreLayout from 'ui/coreComponents/layout/CoreLayout';
import NotFoundView from 'ui/notFound/NotFoundView';
import StreamListContainer from 'ui/streams/list/StreamList.container';
// import StreamDetailsContainer from 'ui/streams/details/StreamDetails.container';
import StreamsLayout from 'ui/streams/Streams.layout';
// import StateContainer from 'ui/streams/state/State.container';
// import RegionMapContainer from 'ui/streams/regionMap/RegionMap.container';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={StreamListContainer}/>
    <Route path='/404' component={NotFoundView}/>
    
    <Route path='/:stateId' component={StreamsLayout}/>
    <Route path='/:stateId/:regionId' component={StreamsLayout}/>
    <Route path='/:stateId/:regionId/:streamSlug' component={StreamsLayout}/>
    <Redirect from='*' to='404' />
  </Route>
);
// <Route path='streams/:streamId' component={StreamDetailsContainer}/>
