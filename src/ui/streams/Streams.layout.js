'use strict';
import React from 'react';

export const StreamsLayout = React.createClass({
  propTypes: {
    stream: React.PropTypes.object.isRequired
  },

  render () {
    return (<div>
        <div>streams</div>
        <button>Load Minnesota</button>
      </div>);
  }
});

export default StreamsLayout;
