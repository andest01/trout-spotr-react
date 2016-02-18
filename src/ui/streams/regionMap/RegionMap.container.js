'use strict';
import React from 'react';
import _ from 'lodash';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { actions as streamActions } from '../streams.actions';
import styles from './regionMap.style.scss';

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

export const RegionMapComponent = React.createClass({
  // propTypes: {
  //   stream: React.PropTypes.object.isRequired
  // },

  propTypes: {
    streamsGeoJSON: React.PropTypes.object.isRequired,
    countiesGeoJSON: React.PropTypes.object.isRequired,
    regionsGeoJSON: React.PropTypes.object.isRequired,
    statesGeoJSON: React.PropTypes.object.isRequired,
    selectedState: React.PropTypes.object.isRequired,
    selectedRegion: React.PropTypes.object.isRequired,
    tableOfContents: React.PropTypes.array.isRequired,
    filter: React.PropTypes.object.isRequired,

    filterStreams: React.PropTypes.func.isRequired,
    loadStreams: React.PropTypes.func.isRequired,
    selectStream: React.PropTypes.func.isRequired,
    selectRegion: React.PropTypes.func.isRequired,
    params: React.PropTypes.object
  },

  getRegions (stateId) {
    let toc = this.props.tableOfContents;
    if (stateId == null || toc == null || toc.length === 0) {
      return [];
    }

    var indexOfChange = _.findIndex(toc, state => state.shortName === stateId);
    if (indexOfChange < 0) {
      return [];
    }

    var soughtState = toc[indexOfChange];
    let { children } = soughtState;
    return children;
  },

  getCounties (stateId, regionId) {
    if (regionId == null) {
      return [];
    }

    let regions = this.getRegions(stateId);
    if (regions == null || regions.length === 0) {
      return [];
    }

    var indexOfChange = _.findIndex(regions, region => region.shortName === regionId);
    if (indexOfChange < 0) {
      return [];
    }

    var soughtState = regions[indexOfChange];
    let { children } = soughtState;
    return children;
  },

  render () {
    let stateId = this.props.params.stateId;
    let regionId = this.props.params.regionId;

    var counties = this.getCounties(stateId, regionId);
    console.log(counties);

    return (
            <div className={styles['stream-list']} >
        {
          counties.map(county => {
            let countyId = county.id;
            let name = county.name;
            return (
                <div>
                  <h3 key={countyId}>{name}</h3>
                  <div >
                    <ul>
                    {
                      county.children.map(stream => {
                        let streamId = stream.id;
                        let name = stream.name;
                        return (
                            <li key={streamId}>{name} lolol</li>
                          );
                      })
                    }
                    </ul>
                  </div>
                </div>
              );
          })
        }
      </div>);
  }
});

// export default RegionMapComponent;

export default connect(mapStateToProps, streamActions)(RegionMapComponent);

