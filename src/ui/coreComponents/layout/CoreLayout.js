import React from 'react';
import '../../styles/core.scss';
import style from './coreLayout.style.scss';
import { Link } from 'react-router';
import StreamsLayout from 'ui/streams/Streams.layout';
// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of it's props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
      <div className={style['body']}>
        <div className='right'>
          <Link to='/streams'>Streams</Link>
        </div>
        
        <StreamsLayout/>
      </div>
  );
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
};

export default CoreLayout;
