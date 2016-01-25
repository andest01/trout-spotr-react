'use strict';
import React from 'react';
import { Link } from 'react-router';

export const SidebarContainer = React.createClass({
  propTypes: {
    stream: React.PropTypes.object.isRequired
  },

  render () {
    return (<div>sidebar</div>);
  }
});

export default SidebarContainer;
