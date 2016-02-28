/*global mapboxgl*/
'use strict';

import React from 'react';
// import { connect } from 'react-redux';
import GLMap from './MapComponent';
let mapToken = 'pk.eyJ1IjoiYW5kZXN0MDEiLCJhIjoibW02QnJLSSJ9._I2ruvGf4OGDxlZBU2m3KQ';
require('script!mapbox-gl/dist/mapbox-gl-dev.js');
import turf from 'turf';
import _ from 'lodash';
// import styles from '../streams/streams.styles.scss';

// const STREAM_CENTROID_SOURCE = 'STREAM_CENTROID_SOURCE';
// const STREAM_CENTROID_LAYER = 'STREAM_CENTROID_LAYER';
// const mapStateToProps = (state) => {
//   let obj = {
//     streamsGeoJSON: state.streamList.streamsGeoJSON,
//     countiesGeoJSON: state.streamList.countiesGeoJSON,
//     regionsGeoJSON: state.streamList.regionsGeoJSON,
//     statesGeoJSON: state.streamList.statesGeoJSON,
//     tableOfContents: state.streamList.tableOfContents,
//     selectedState: state.streamList.selectedState,
//     selectedRegion: state.streamList.selectedRegion,
//     selectedStream: state.streamList.selectedStream,
//     filter: state.streamList.filter
//   };
//   return obj;
// };

export const MapContainer = React.createClass({

  propTypes: {
    // streamsGeoJSON: React.PropTypes.object.isRequired,
    // countiesGeoJSON: React.PropTypes.object.isRequired,
    // regionsGeoJSON: React.PropTypes.object.isRequired,
    // statesGeoJSON: React.PropTypes.object.isRequired,
    selectedState: React.PropTypes.object.isRequired,
    selectedRegion: React.PropTypes.object.isRequired,
    // tableOfContents: React.PropTypes.array.isRequired,
    // filter: React.PropTypes.object.isRequired,

    // filterStreams: React.PropTypes.func.isRequired,
    // loadStreams: React.PropTypes.func.isRequired,
    // selectStream: React.PropTypes.func.isRequired,
    // selectRegion: React.PropTypes.func.isRequired,
    selectedStream: React.PropTypes.object.isRequired
  },

  zoomToStream (selectedStream) {
    let map = this.refs.glmap.map;
    let boundingBox = selectedStream.boundingBox;
    setTimeout(() => {
      map.fitBounds(boundingBox, {
        speed: 0.9,
        padding: 100,
        pitch: 20
      });
    }, 1);
  },

  zoomToRegion (selectedRegion) {

  },

  zoomToState (selectedState) {

  },

  zoomToDefaultBounds () {

  },

  componentDidUpdate (prevProps) {
    // just create little dots for now.
    let map = this.refs.glmap.map;
    if (this.props.selectedStream != null && this.props.selectedStream.slug != null) {
      this.zoomToStream(this.props.selectedStream);
      return;
    }
    let selectedRegion = this.props.selectedRegion;
    let counties = selectedRegion.children;  // _.flatten(_.property(selectedRegion, 'children'));
    let streams = _.flatMap(counties, x => x.children);
    let geoJsonPoints = streams.map(s => {
      return turf.point([s.CentroidLongitude, s.CentroidLatitude], s);
    });

    let pointsFeature = turf.featurecollection(geoJsonPoints);
    // let source = map.getSource(STREAM_CENTROID_SOURCE);
    // if (source == null) {
    //   return;
    // }
    // source.setData(pointsFeature);

    let wsenBoundingBox = turf.extent(pointsFeature);
    setTimeout(() => {
      let bounds = mapboxgl.LngLatBounds.convert(wsenBoundingBox);
      map.fitBounds(bounds, {
        speed: 2.0,
        padding: 100,
        pitch: 0
      });
    }, 1);
  },

  componentWillMount () {
    this.mapView = {
      // style: 'mapbox://styles/andest01/cikex1wu500d19slys8efkls6', //mapbox://styles/mapbox/dark-v8',
      style: 'mapbox://styles/andest01/cikma5lpf0066sykp420surgt',
      center: [-91.285985, 44],
      pitch: 0,
      bearing: 0,
      zoom: 5,
      container: 'mapThing'
    };
  },

  componentDidMount () {
    console.log('did mount.');
    // this.refs.glmap.map.off('tile.error', this.refs.glmap.map.onError);
    this.refs.glmap.map.on('load', () => {
      // let map = this.refs.glmap.map;

      // // create streamCentroids source
      // let emptyCentroids = turf.featurecollection([]);
      // var emptyCentroidSource = new mapboxgl.GeoJSONSource({
      //     data: emptyCentroids
      //   });

      // map.addSource(STREAM_CENTROID_SOURCE, emptyCentroidSource);

      // map.addLayer({
      //     'id': STREAM_CENTROID_LAYER,
      //     'interactive': true,
      //     'type': 'circle',
      //     'source': STREAM_CENTROID_SOURCE,
      //     'paint': {
      //       'circle-color': 'green',
      //       'circle-radius': 1
      //     }
      //   });

// STREAM_CENTROID_SOURCE
      // create layer
    });
  },

  render () {
    const mapStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
      // width: '100%',
      // height: '100%'
    };
    return (

      <div style={{position: 'relative', height: '100vh'}}>
        <div >
          <GLMap ref = 'glmap' mapStyle = { mapStyle } view = { this.mapView } token = { mapToken } />
        </div>
      </div>
    );
  }
});

// export default connect(mapStateToProps, mapActions)(MapContainer);
export default MapContainer;
