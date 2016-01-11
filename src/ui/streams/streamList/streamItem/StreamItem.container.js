'use strict';
import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { actions as streamActions } from '../streams.actions';
// import classes from './HomeView.scss';


const mapStateToProps = (state) => {
  let obj = {
    streams: state.streamList.streams,
    counties: state.streamList.counties,
    region: state.streamList.region
  }; 
  return obj;
};

export class StreamItemContainer extends React.Component {
  static propTypes = {
    stream: React.PropTypes.object.isRequired,
    loadGeometry: React.PropTypes.func.isRequired,
    selectStream: React.PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <button className='btn btn-default'
                onClick={() => this.props.loadStreams()}>
          Load Streams
        </button>
        
      </div>
    );
  }
}

export default connect(mapStateToProps, streamActions)(StreamItemContainer);
