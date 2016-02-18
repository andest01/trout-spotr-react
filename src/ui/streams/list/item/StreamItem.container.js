'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { actions as streamActions } from '../../streams.actions';
import StreamItemComponent from './StreamItem.component';
// import classes from './HomeView.scss';

const mapStateToProps = (state) => {
  let obj = {
    region: state.streamList.selectedRegion,
    state: state.streamList.selectedState
  };
  return obj;
};

const StreamItemContainer = React.createClass({
  propTypes: {
    stream: React.PropTypes.object.isRequired,
    region: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired
  },

  componentDidMount () {
    // console.log('stream component is loading');
  },

  componentWillUnmount () {
    // console.log('stream component is unloading');
  },

  render () {
    // console.log(this);
    return (
      <StreamItemComponent stream={this.props.stream} />
    );
  }
});

export default connect(mapStateToProps, streamActions)(StreamItemContainer);
