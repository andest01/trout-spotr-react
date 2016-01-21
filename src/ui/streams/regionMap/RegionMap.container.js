'use strict';
import React from 'react';
import { Link } from 'react-router';

export const RegionMapComponent = React.createClass({
  propTypes: {
    stream: React.PropTypes.object.isRequired
  },

  render () {
    let stream = this.props.stream;
    return (<Link to={'/streams/region' + stream.id}>{stream.name} lol</Link>);
  }
});

export default RegionMapComponent;
