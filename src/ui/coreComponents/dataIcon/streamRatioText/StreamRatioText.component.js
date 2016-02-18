'use strict';
import React from 'react';
import _ from 'lodash';
import ratioStyle from './StreamRatioText.style.scss';

export class StreamRatioTextComponent extends React.Component {
  static propTypes = {
    length: React.PropTypes.number.isRequired,
    className: React.PropTypes.string.isRequired,
    units: React.PropTypes.string.isRequired
  };

  getLength (length) {
    let viewLength = 0;
    if (length <= 0) {
      return 0;
    } else if (length < 1) {
      viewLength = _.round(length, 2);
    } else if (length < 100) {
      viewLength = _.round(length, 1);
    } else {
      viewLength = Math.round(length);
    }

    return viewLength;
  }

  render () {
    let viewLength = this.getLength(this.props.length);
    let inactive = viewLength <= 0.05 ? ratioStyle.inactive : '';
    let streamLength = viewLength + ' ' + this.props.units;
    return (
      <div className={this.props.className}>
        <span className={inactive}>{streamLength}</span>
      </div>
    );
  }
}

export default StreamRatioTextComponent;
