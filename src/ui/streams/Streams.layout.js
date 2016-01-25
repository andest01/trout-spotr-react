'use strict';
import React from 'react';
// import SidebarContainer from './sidebar/Sidebar.container';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { actions as streamActions } from './streams.actions';
import styles from './streams.styles.scss';
import StreamFilterContainer from './filter/StreamFilter.container';
import _ from 'lodash';

import MapContainer from '../map/MapContainer';

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

export const StreamsLayout = React.createClass({
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
    children: React.PropTypes.object
  },

  onStateClick () {

  },

  componentDidMount () {
    this.props.loadStreams();
  },

  getStates () {
    let toc = this.props.tableOfContents;
    if (toc == null || toc.length === 0) {
      return [];
    }

    return toc;
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

  //       { this.props.children }

  render () {
    debugger;
    let stateId = this.props.params.stateId || null;
    let regionId = this.props.params.regionId || null;
    let states = this.getStates();
    let regions = this.getRegions(stateId);
    let counties = this.getCounties(stateId, regionId);

    console.log(stateId, regionId);
    return (<div className={styles['layout']}>

        <div className={styles['sidebar']}>
      <div className={styles['flexbox-parent']}>
        <div className={styles['flexbox-top']}>
          <StreamFilterContainer tableOfContents={this.props.tableOfContents} selectedState={this.props.selectedState} selectedRegion={this.props.selectedRegion} filter={this.props.filter} />
        </div>
        <div className={styles['flexbox-bottom']}>
          content bottom
          <ul className={styles['list']}>
            <li className={styles['item']}> WHY DOESN'T SHIT JUST SCROLL LIKE GOD INTENDED </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> item </li>
            <li className={styles['item']}> THIS LAST ITEM MUST BE VISIBLE WHEN YOU SCROLL DOWN</li>
          </ul>
        </div>

      </div>
    </div>

    <div className={styles['lrg-content']}>
        <MapContainer/>
    </div>
      </div>);
  }
});

export default connect(mapStateToProps, streamActions)(StreamsLayout);

// export default StreamsLayout;
