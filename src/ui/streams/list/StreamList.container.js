'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { actions as streamActions } from '../streams.actions';
import StreamFilterComponent from '../filter/StreamFilter.component';
import StreamItemContainer from './item/StreamItem.container';
// import StreamItemContainer from './streamItem/StreamItemContainer';
// import classes from './HomeView.scss';

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

export class StreamListContainer extends React.Component {
  static propTypes = {
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
    selectRegion: React.PropTypes.func.isRequired
  };

  render () {
    let regions = [];
    let mn = this.props.tableOfContents[0];
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
          <StreamFilterComponent
            selectedRegion={this.props.selectedRegion}
            filter={this.props.filter}
            tableOfContents={this.props.tableOfContents}
            filterStreams={this.props.filterStreams}/>
        </div>
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
                              county.children.filter((stream) => stream.visible).map((stream) => { return (<li key={stream.id}><StreamItemContainer stream={stream}/></li>); })
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
