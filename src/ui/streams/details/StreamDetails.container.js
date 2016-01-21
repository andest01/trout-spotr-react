'use strict';
import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { actions as streamDetailsActions } from './streamDetails.actions';
const mapStateToProps = (state) => {
  let obj = {
    isLoading: state.streamDetails.isLoading,
    streamId: state.streamDetails.streamId,
    stream: state.streamDetails.stream,
    streamGeometry: state.streamDetails.streamGeometry,
    publiclyAccessibleLandGeometry: state.streamDetails.publiclyAccessibleLandGeometry,
    accessPointsGeometry: state.streamDetails.accessPointsGeometry,
    specialRegulationsGeometry: state.streamDetails.specialRegulationsGeometry,
    routeUrl: state.streamDetails.routeUrl,

    tableOfContents: state.streamList.tableOfContents,
    selectedState: state.streamList.selectedState,
    selectedRegion: state.streamList.selectedRegion
  };
  return obj;
};

export const StreamDetailsContainer = React.createClass({
  propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    streamId: React.PropTypes.number.isRequired,
    stream: React.PropTypes.object.isRequired,
    streamGeometry: React.PropTypes.object.isRequired,
    publiclyAccessibleLandGeometry: React.PropTypes.object.isRequired,
    accessPointsGeometry: React.PropTypes.object.isRequired,
    specialRegulationsGeometry: React.PropTypes.object.isRequired,
    routeUrl: React.PropTypes.string.isRequired,
    tableOfContents: React.PropTypes.array.isRequired,
    loadStream: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired
  },

  componentDidMount () {
    console.log('stream is loading', this.props.params.streamId);
    
  },

  componentWillUnmount () {
    console.log('stream is unloading');
  },

  render () {
    return (
      <div className='container text-center'>
        
      </div>
    );
  }
});

export default connect(mapStateToProps, streamDetailsActions)(StreamDetailsContainer);
