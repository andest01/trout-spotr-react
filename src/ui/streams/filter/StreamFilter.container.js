'use strict';
import React from 'react';

const mapStateToProps = (state) => {
  let obj = {
    // streamsGeoJSON: state.streamList.streamsGeoJSON,
    // countiesGeoJSON: state.streamList.countiesGeoJSON,
    // regionsGeoJSON: state.streamList.regionsGeoJSON,
    // statesGeoJSON: state.streamList.statesGeoJSON,
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
    filter: React.PropTypes.object.isRequired
  },

  onTextChange (event) {
    // let input = event.target.value;
    // console.log(event.target.value);
    // this.props.filterStreams(input);
  },

  // <input type='text' placeholder='Search streams' value={this.props.filter.searchText} onChange={event => this.onTextChange(event)} />

  render () {
    return (
      <div >
          filter will go here
      </div>
    );
  }
});

//  connect(mapStateToProps, streamActions)(StreamFilterContainer);
export default StreamFilterContainer;

