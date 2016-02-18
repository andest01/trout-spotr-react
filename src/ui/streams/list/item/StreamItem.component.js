'use strict';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import StreamRatioTextContainer from 'ui/coreComponents/dataIcon/streamRatioText/StreamRatioText.container';
const { routeActions } = require('redux-simple-router');
import _ from 'lodash';
import { actions as streamActions } from '../../streams.actions';
import style from './StreamItem.style.scss';
var allActions = Object.assign({}, streamActions, routeActions);
const mapStateToProps = (state) => {
  let obj = {
    selectedState: state.streamList.selectedState,
    selectedRegion: state.streamList.selectedRegion,
    selectedStream: state.streamList.selectedStream
  };
  return obj;
};

export const StreamItemComponent = React.createClass({
  propTypes: {
    selectedState: React.PropTypes.object.isRequired,
    selectedRegion: React.PropTypes.object.isRequired,
    selectedStream: React.PropTypes.object.isRequired,
    stream: React.PropTypes.object.isRequired,

    push: React.PropTypes.func.isRequired,
    selectStream: React.PropTypes.func.isRequired
  },

  getUrl () {
    let streamId = this.props.stream.id;
    let regionId = this.props.selectedRegion.shortName;
    let stateId = this.props.selectedState.shortName;
    let url = `/streams/${stateId}/${regionId}/${streamId}`;

    return url;
  },

  onStreamSelect () {
    let {selectedState, selectedRegion, stream} = this.props;
    this.props.selectStream({stateId: selectedState.shortName, regionId: selectedRegion.shortName, streamId: stream.id});
  },

  render () {
    let stream = this.props.stream;
    let url = this.getUrl();
    let isSelected = this.props.stream.id === this.props.selectedStream.id;
    if (isSelected) {
      console.log('selected!');
    }
    let containerClass = isSelected ? style['selected'] : style['container'];
    return (
      <Link to={url}  onClick={this.onStreamSelect} >
        <div className={containerClass}>
          <div className={style['header-container']}>
            <div className={style['primary']}>
              <span>
                <StreamRatioTextContainer stream={stream}/>
                <span className={style['title']}>{stream.name}</span>
                <span className={style['icon']}></span>
              </span>
            </div>
          </div>
        </div>
      </Link>
       );
  }
});

export default connect(mapStateToProps, allActions)(StreamItemComponent);
