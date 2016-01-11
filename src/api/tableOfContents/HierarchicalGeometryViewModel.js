'use strict';

function HierarchicalGeometryViewModel () {
  this.init();
}

HierarchicalGeometryViewModel.prototype = {
  id: null,
  name: '',
  shortName: '',
  geometry: null,
  centroidLatitude: NaN,
  centroidLongitude: NaN,
  type: null,
  parent: null,
  children: [],

  init: function () {
    this.id = null;
    this.name = '';
    this.shortName = '';
    this.geometry = null;
    this.centroidLongitude = NaN;
    this.centroidLatitude = NaN;
    this.parent = null;
    this.children = [];
  }
};

export default HierarchicalGeometryViewModel;
