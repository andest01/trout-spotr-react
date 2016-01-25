'use strict';
import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { actions as streamActions } from '../streams.actions';

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

export const StateContainer = React.createClass({

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
    params: React.PropTypes.object,
    children: React.PropTypes.element
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

  // {this.props.params.stateId}
  render () {
    let stateId = this.props.params.stateId;
    let regions = this.getRegions(stateId);
    if (regions == null || regions.length === 0) {
      return null;
    }

    let rootUrl = `/streams/${stateId}/`;
    return (
      <div>
        <div>STATE {this.props.params.stateId}</div>
        {
          regions.map(r => {
            let id = r.id;
            let shortName = r.shortName;
            let name = r.name;
            return (<div key={id}><Link to={rootUrl + shortName}>{name}</Link></div>);
          })
        }
        {this.props.children}
      </div>);
  }
});

export default connect(mapStateToProps, streamActions)(StateContainer);

// export default StateContainer;
