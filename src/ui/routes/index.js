import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'ui/layouts/CoreLayout/CoreLayout';
import HomeView from 'ui/views/HomeView/HomeView';
import NotFoundView from 'ui/views/NotFoundView/NotFoundView';
import StreamListContainer from 'ui/streams/streamList/StreamList.container';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={StreamListContainer} />
    <Route path='/404' component={NotFoundView} />
    <Route path='/streams' component={StreamListContainer} />
    <Redirect from='*' to='/404' />
  </Route>
);
