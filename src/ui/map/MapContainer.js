'use strict';

import React from 'react';
import { connect } from 'react-redux';
import GLMap from './MapComponent';
let mapToken = 'pk.eyJ1IjoiYW5kZXN0MDEiLCJhIjoibW02QnJLSSJ9._I2ruvGf4OGDxlZBU2m3KQ';
require('script!mapbox-gl/dist/mapbox-gl-dev.js');

const mapStateToProps = (state) => {
  let obj = {
    streamsGeoJSON: state.streamList.streamsGeoJSON,
    countiesGeoJSON: state.streamList.countiesGeoJSON,
    regionsGeoJSON: state.streamList.regionsGeoJSON,
    statesGeoJSON: state.streamList.statesGeoJSON,
    tableOfContents: state.streamList.tableOfContents,
    selectedState: state.streamList.selectedState,
    selectedRegion: state.streamList.selectedRegion,
    filter: state.streamList.filter
  };
  return obj;
};

export const MapContainer = React.createClass({

  // propTypes: {
  //   streamsGeoJSON: React.PropTypes.object.isRequired,
  //   countiesGeoJSON: React.PropTypes.object.isRequired,
  //   regionsGeoJSON: React.PropTypes.object.isRequired,
  //   statesGeoJSON: React.PropTypes.object.isRequired,
  //   selectedState: React.PropTypes.object.isRequired,
  //   selectedRegion: React.PropTypes.object.isRequired,
  //   tableOfContents: React.PropTypes.array.isRequired,
  //   filter: React.PropTypes.object.isRequired,

  //   filterStreams: React.PropTypes.func.isRequired,
  //   loadStreams: React.PropTypes.func.isRequired,
  //   selectStream: React.PropTypes.func.isRequired,
  //   selectRegion: React.PropTypes.func.isRequired
  // },

  componentDidUpdate (prevProps) {
    
  },

  componentWillMount () {
    this.mapView = {
      style: 'mapbox://styles/mapbox/light-v8',
      center: [-93.285985, 10],
      pitch: 0,
      bearing: 0,
      zoom: 2,
      container: 'mapThing'
    };
  },

  componentDidMount () {
    // debugger;
    // this.mapView = {
    //   style: 'mapbox://styles/mapbox/light-v8',
    //   center: [-93.285985, 41],
    //   pitch: 0,
    //   bearing: 0,
    //   zoom: 5,
    //   container: 'mapThing'
    // };
  },

  render () {
    const mapStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    };
    debugger;
    return (

      <div>
        <div className = 'map'>
          <GLMap ref = 'glmap' mapStyle = { mapStyle } view = { this.mapView } token = { mapToken } /> 
        </div>
      </div>
    );
  }
});



// export default connect(mapStateToProps, mapActions)(MapContainer);
export default MapContainer;
