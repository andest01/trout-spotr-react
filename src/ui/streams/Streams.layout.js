'use strict';
import React from 'react';
import MediaQuery from 'react-responsive';
// import SidebarContainer from './sidebar/Sidebar.container';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { actions as streamActions } from './streams.actions';
import styles from './streams.styles.scss';
import StreamFilterContainer from './filter/StreamFilter.container';
import _ from 'lodash';
import StreamListContainer from './list/StreamList.container';

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
    filter: state.streamList.filter,
    selectedStream: state.streamList.selectedStream

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
    selectedStream: React.PropTypes.object.isRequired,

    filterStreams: React.PropTypes.func.isRequired,
    loadStreams: React.PropTypes.func.isRequired,
    selectStream: React.PropTypes.func.isRequired,
    selectRegion: React.PropTypes.func.isRequired,
    selectState: React.PropTypes.func.isRequired,
    selectStateAndRegion: React.PropTypes.func.isRequired,
    children: React.PropTypes.object
  },

  onStateClick () {

  },

  setTitle () {
    if (this.props.selectedStream != null && this.props.selectedStream.id != null) {
      document.title = this.props.selectedStream.name;
      return;
    }

    if (this.props.selectedRegion != null && this.props.selectedRegion.id != null) {
      document.title = this.props.selectedRegion.name;
      return;
    }

    if (this.props.selectedState != null && this.props.selectedState.id != null) {
      document.title = this.props.selectedState.name;
      return;
    }

    document.title = 'Trout Spotr';
  },

  componentDidUpdate () {
    this.setTitle();
  },

  componentWillMount () {
    // let stateId = this.props.params.stateId || null;
    // let regionId = this.props.params.regionId || null;
    // let streamId = this.props.params.streamSlug || null;
    // var t = this.props.loadStreams({stateId, regionId, streamId})
    //   .then(x => {
    //     // console.log(x);
    //     // debugger;
    //     // if (stateId == null && regionId == null) {
    //     //   console.log('load nothing');
    //     //   this.props.selectState({stateId: null});
    //     // } else if (regionId == null) {
    //     //   console.log('load state');
    //     //   this.props.selectState({stateId});
    //     // } else if (stateId != null && regionId != null) {
    //     //   console.log('load state and region');
    //     //   this.props.selectStateAndRegion({stateId, regionId});
    //     // }
    //   });
  },

  componentDidMount () {

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

//              <div className={styles['flexbox-top']}>
//              <StreamFilterContainer
//                tableOfContents={this.props.tableOfContents}
//                selectedState={this.props.selectedState}
//                selectedRegion={this.props.selectedRegion}
//                filter={this.props.filter}
//                selectState={this.props.selectState}
//                selectRegion={this.props.selectRegion} />
//            </div>
//            <div className={styles['flexbox-bottom']}>
//              <StreamListContainer />
//            </div>

  render () {
    // let stateId = this.props.params.stateId || null;
    // let regionId = this.props.params.regionId || null;
    // let states = this.getStates();
    // let regions = this.getRegions(stateId);
    // let counties = this.getCounties(stateId, regionId);

    return (
      <div className={styles['layout']}>
        <div className={styles['sidebar']}>
          <div className={styles['flexbox-parent']}>
                         <div className={styles['flexbox-top']}>
             <StreamFilterContainer
               tableOfContents={this.props.tableOfContents}
               selectedState={this.props.selectedState}
               selectedRegion={this.props.selectedRegion}
               filter={this.props.filter}
               selectState={this.props.selectState}
               selectRegion={this.props.selectRegion} />
           </div>
           <div className={styles['flexbox-bottom']}>
             <StreamListContainer />
           </div>
          </div>
        </div>
        <div className={styles['lrg-content']}>
          <MediaQuery query='(orientation: landscape)'>
          <MapContainer
            selectedState={this.props.selectedState}
            selectedRegion={this.props.selectedRegion}
            selectedStream={this.props.selectedStream}/>
          </MediaQuery>
        </div>
      </div>);
  }
});

//
export default connect(mapStateToProps, streamActions)(StreamsLayout);

// export default StreamsLayout;
