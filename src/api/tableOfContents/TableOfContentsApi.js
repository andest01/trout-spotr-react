import BaseApi from '../BaseApi';
import _ from 'lodash';
import topojson from 'topojson';
import HierarchicalGeometryViewModel from './HierarchicalGeometryViewModel';
import StreamGeometryViewModel from './StreamGeometryViewModel';
import { default as Q } from 'q';
export class TableOfContentsApi extends BaseApi {

  constructor (settings) {
    super(settings);
  }

  getData () {
    let key = 'tableOfContents.topo.json';
    let cacheCandidate = this.cache.get(key);
    let promise = null;
    if (cacheCandidate != null) {
      promise = Q.fcall(() => { return cacheCandidate; });
    } else {
      promise = super.get('tableOfContents.topo.json')
        .then((data) => {
          this.cache.set(key, data);
          return data;
        });
    }

    return promise.then(data => {
      let regionTopoJson = data;
      let state = topojson.feature(regionTopoJson, regionTopoJson.objects.state);
      let regions = topojson.feature(regionTopoJson, regionTopoJson.objects.region);
      let counties = topojson.feature(regionTopoJson, regionTopoJson.objects.county);
      let streams = topojson.feature(regionTopoJson, regionTopoJson.objects.streamProperties);
      let tableOfContents = {
        state, regions, counties, streams
      };

      return tableOfContents;
    });
  }

  getTableOfContents (data) {
    let {
      state, regions, counties, streams
    } = data;

    let stateHash = _(state.features)
      .map((feature) => {
        let stateModel = new HierarchicalGeometryViewModel();
        let prop = feature.properties;
        stateModel.id = prop.gid;
        stateModel.name = prop.name;
        stateModel.centroidLatitude = NaN;
        stateModel.shortName = prop.short_name;
        stateModel.centroidLongitude = NaN;
        stateModel.parent = null;
        stateModel.type = 'state';
        stateModel.children = [];
        stateModel.geometry = feature;
        return stateModel;
      })
      .keyBy('id')
      .value();

    let regionHash = _(regions.features)
      .map((feature) => {
        let regionModel = new HierarchicalGeometryViewModel();
        regionModel.shortName = feature.properties.name;
        regionModel.id = feature.properties.gid;
        regionModel.name = feature.properties.name;
        regionModel.geometry = feature;
        regionModel.type = 'region';
        return regionModel;
      })
      .sortBy('name')
      .keyBy('id')
      .value();

    let countyhash = _(counties.features)
      .filter((feature) => {
        return feature.properties.stream_count > 0;
      })
      .map((feature) => {
        let countyModel = new HierarchicalGeometryViewModel();
        let properties = feature.properties;
        countyModel.id = properties.gid;
        countyModel.name = properties.name;
        countyModel.geometry = feature;
        _.extend(countyModel, properties);
        countyModel.type = 'county';
        return countyModel;
      })
      .sortBy('name')
      .keyBy('id')
      .value();

    let countyByRegion = _(countyhash)
      .groupBy('region_id')
      .value();

    // TODO: Fix this nonsense.
    let minnesota = stateHash['49'];
    let regionByState = _(regionHash)
      .groupBy(() => {
        return minnesota.id;
      })
      .value();

    let streamHash = _(streams.features)
      .map((feature) => {
        let streamModel = new StreamGeometryViewModel();
        let properties = feature.properties;
        streamModel.id = properties.Id;
        streamModel.name = properties.Name;
        streamModel.geometry = feature;
        streamModel.visible = true;
        streamModel.centroidLongitude = properties.CentroidLongitude;
        streamModel.centroidLatitude = properties.CentroidLatitude;
        _.extend(streamModel, properties);
        streamModel.type = 'streamCentroid';
        return streamModel;
      })
      .sortBy('name')
      .keyBy('id')
      .value();

    _.forEach(stateHash, (state) => {
      let stateId = state.id;
      let regions = regionByState[stateId];
      state.children = regions;
      _.forEach(state.children, (region) => {
        let regionId = region.id;
        let counties = countyByRegion[regionId];
        region.children = counties;
        region.parent = state;
        _.forEach(region.children, (c) => {
          c.parent = region;
        });
      });
    });

    // now we have to get the streams under the counties.
    // we have to respect the Many to Many relationship.
    _.forEach(streamHash, (stream) => {
      _.forEach(stream.Counties, (streamCountyModel) => {
        let countyModel = countyhash[streamCountyModel.Id];
        countyModel.children.push(stream);
        // what to do about the parent tho?
      });
    });
    return {states: _(stateHash).values().value(), streams: _(streamHash).values().value()};
  }
}

export default new TableOfContentsApi();
