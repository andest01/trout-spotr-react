'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { actions as streamActions } from '../streams.actions';
import StreamItemContainer from './item/StreamItem.container';

import countyStyles from './CountyComponent.style.scss';

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
    let counties = this.props.selectedRegion.children || [];
    return (
      <div>
        <div>
          {
            counties.map((county) => {
              return (<div key={county.id}>
                        <h3 className={countyStyles.container}><span className={countyStyles.title}>{county.name} County</span></h3>
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
