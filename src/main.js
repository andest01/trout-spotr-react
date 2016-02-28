// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createHistory, useBasename } from 'history';
// import { syncReduxAndRouter } from 'redux-simple-router';
// import routes from 'ui/routes';
// import Root from 'ui/Root';
// import configureStore from 'ui/configureStore';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();
// const history = useBasename(createHistory)({
//   basename: __BASENAME__
// });
// const store = configureStore(window.__INITIAL_STATE__);

// syncReduxAndRouter(history, store, (state) => state.router);

// // Render the React application to the DOM
// ReactDOM.render(
//   <Root history={history} routes={routes} store={store} />,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import routes from 'ui/routes';
import Root from 'ui/Root';
import configureStore from 'ui/configureStore';

const historyConfig = { basename: __BASENAME__ };
const history = useRouterHistory(createHistory)(historyConfig);

const initialState = window.__INITIAL_STATE__;
const store = configureStore({ initialState, history });

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
