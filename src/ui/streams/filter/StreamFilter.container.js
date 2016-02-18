'use strict';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
const { routeActions } = require('redux-simple-router');

console.log(routeActions);
const mapStateToProps = (state) => {
  let obj = {
    tableOfContents: state.streamList.tableOfContents,
    selectedState: state.streamList.selectedState,
    selectedRegion: state.streamList.selectedRegion,
    filter: state.streamList.filter
  };
  return obj;
};

export const StreamFilterContainer = React.createClass({
  propTypes: {
    tableOfContents: React.PropTypes.array.isRequired,
    selectedState: React.PropTypes.object.isRequired,
    selectedRegion: React.PropTypes.object.isRequired,
    filter: React.PropTypes.object.isRequired,
    selectRegion: React.PropTypes.func.isRequired,
    selectState: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired
  },

  onTextChange (event) {
    // let input = event.target.value;
    // console.log(event.target.value);
    // this.props.filterStreams(input);
  },

  onChangeState (state) {
    // do state change
    this.props.push(`/streams/${state.shortName}`);
    // this.props.selectState({stateId: state.shortName, regionId: null});
    this.props.selectState({stateId: state.shortName});
  },

  onChangeRegion (state, region) {
    // do state change
    this.props.push(`/streams/${state.shortName}/${region.shortName}`);
    this.props.selectRegion({stateId: state.shortName, regionId: region.shortName});
  },

  // <input type='text' placeholder='Search streams' value={this.props.filter.searchText} onChange={event => this.onTextChange(event)} />

  render () {
    var states = this.props.tableOfContents;
    if (states == null) {
      // loading
      return null;
    }

    let regions = this.props.selectedState.children || [];
// <Link to={`/streams/${statePathName}/`}>{stateName}</Link>
    return (
      <div >
          {
            states.map(state => {
              let stateId = state.id;
              let stateName = state.name;
              return (<div key={stateId}><button onClick={(event) => this.onChangeState(state)}>{stateName}</button></div>);
            })
          }

          {
            regions.map(region => {
              let regionId = region.id;
              let regionName = region.name;
              return (<span key={regionId}><button onClick={(event) => this.onChangeRegion(this.props.selectedState, region)}>{regionName}</button></span>);
            })
          }
      </div>
    );
  }
});

export default connect(mapStateToProps, {push: routeActions.push})(StreamFilterContainer);

