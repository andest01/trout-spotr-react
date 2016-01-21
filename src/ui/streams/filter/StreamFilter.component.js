'use strict';
import React from 'react';

export class StreamFilterComponent extends React.Component {
  static propTypes = {
    selectedRegion: React.PropTypes.object.isRequired,
    filter: React.PropTypes.object.isRequired,
    tableOfContents: React.PropTypes.array.isRequired,
    filterStreams: React.PropTypes.func.isRequired
  };

  onTextChange (event) {
    let input = event.target.value;
    console.log(event.target.value);
    this.props.filterStreams(input);
  }

  render () {
    return (
      <div className='container text-center'>
        <input type='text' placeholder='Search streams' value={this.props.filter.searchText} onChange={event => this.onTextChange(event)} />
      </div>
    );
  }
}

//  connect(mapStateToProps, streamActions)(StreamFilterComponent);
export default StreamFilterComponent;

