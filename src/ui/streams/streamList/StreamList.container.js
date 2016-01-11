'use strict';
import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { actions as streamActions } from '../streams.actions';
// import classes from './HomeView.scss';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => {
  let obj = {
    streamsGeoJSON: state.streamList.streamsGeoJSON,
    countiesGeoJSON: state.streamList.countiesGeoJSON,
    regionsGeoJSON: state.streamList.regionsGeoJSON,
    statesGeoJSON: state.streamList.statesGeoJSON,
    tableOfContents: state.streamList.tableOfContents,
    selectedState: state.streamList.selectedState,
    selectedRegion: state.streamList.selectedRegion
  };
  return obj;
};

export class StreamListContainer extends React.Component {
  static propTypes = {
    streamsGeoJSON: React.PropTypes.object.isRequired,
    countiesGeoJSON: React.PropTypes.object.isRequired,
    regionsGeoJSON: React.PropTypes.object.isRequired,
    statesGeoJSON: React.PropTypes.object.isRequired,
    selectedState: React.PropTypes.object.isRequired,
    selectedRegion: React.PropTypes.object.isRequired,
    tableOfContents: React.PropTypes.object.isRequired,

    loadStreams: React.PropTypes.func.isRequired,
    selectStream: React.PropTypes.func.isRequired,
    selectRegion: React.PropTypes.func.isRequired
  };

  render () {
    let regions = [];
    let mn = this.props.tableOfContents['49'];
    if (mn != null) {
      regions = mn.children;
    }

    let counties = [];
    if (mn != null && this.props.selectedRegion['id'] != null) {
      counties = this.props.selectedRegion.children;
    }
    return (
      <div className='container text-center'>
        <button className='btn btn-default'
                onClick={() => this.props.loadStreams()}>
          Load Streams
        </button>
        <div>
        {
          regions.map((region) => {
            return (<button onClick={() => this.props.selectRegion(region)} key={region.id}> {region.name}</button>);
          })
        }
        </div>
        <div>
          {
            counties.map((county) => {
              return (<div key={county.id}>
                        <h3>{county.name}</h3>
                        <ul>
                          {
                              county.children.map((stream) => { return (<li key={stream.id}>{stream.name}</li>); })
                          }
                        </ul>
                      </div>);
            })
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, streamActions)(StreamListContainer);
