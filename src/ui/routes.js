import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import CoreLayout from 'ui/coreComponents/layout/CoreLayout';
import NotFoundView from 'ui/notFound/NotFoundView';
import StreamListContainer from 'ui/streams/list/StreamList.container';
import StreamDetailsContainer from 'ui/streams/details/StreamDetails.container';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={StreamListContainer} />
    <Route path='404' component={NotFoundView} />
    <Route path='streams' component={StreamListContainer}>

    </Route>
    <Route path='streams/:streamId' component={StreamDetailsContainer}/>
    <Redirect from='*' to='404' />
  </Route>
);
