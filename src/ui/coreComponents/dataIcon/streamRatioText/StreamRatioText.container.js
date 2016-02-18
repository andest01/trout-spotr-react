'use strict';
import React from 'react';
import StreamRatioTextComponent from './StreamRatioText.component';
import dataIconStyle from '../dataIcon.style.scss';
import ratioStyle from './StreamRatioText.style.scss';

export class StreamRatioTextContainer extends React.Component {
  static propTypes = {
    stream: React.PropTypes.object.isRequired
  };

  render () {
    let stream = this.props.stream;
    let streamLength = stream.TroutStreamsLength;
    let publicLength = stream.PalsLength;
    // let numeratorClass = ratioStyle.numerator;
    return (
      <span className={dataIconStyle.doubleWide}>
        <div className={ratioStyle.streamRatio}>
          <StreamRatioTextComponent
            length={streamLength}
            className={ratioStyle.denominator}
            units={'miles'}/>
          <StreamRatioTextComponent
            length={publicLength}
            className={ratioStyle.numerator}
            units={'miles'}/>
        </div>
      </span>
    );
  }
}

export default StreamRatioTextContainer;
