'use strict';
import React from 'react';
import { Link } from 'react-router';

export const SidebarComponent = React.createClass({
  propTypes: {
    stream: React.PropTypes.object.isRequired
  },

  render () {
    let stream = this.props.stream;
    return (<Link to={'/streams/' + stream.id}>{stream.name} lol</Link>);
  }
});

export default SidebarComponent;
