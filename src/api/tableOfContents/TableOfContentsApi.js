import BaseApi from '../BaseApi';
import _ from 'lodash';
import topojson from 'topojson';
import HierarchicalGeometryViewModel from './HierarchicalGeometryViewModel';

export class TableOfContentsApi extends BaseApi {

  constructor (settings, cache = null) {
    super(settings, cache);
  }

  getData () {
    return super.get('tableOfContents.topo.json')
      .then((data) => {
        let regionTopoJson = data;
        var state = topojson.feature(regionTopoJson, regionTopoJson.objects.state);
        var regions = topojson.feature(regionTopoJson, regionTopoJson.objects.region);
        var counties = topojson.feature(regionTopoJson, regionTopoJson.objects.county);
        var streams = topojson.feature(regionTopoJson, regionTopoJson.objects.streamProperties);

        return {
          state, regions, counties, streams
        };
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
      .indexBy('id')
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
      .indexBy('id')
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
      .indexBy('id')
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
        let streamModel = new HierarchicalGeometryViewModel();
        let properties = feature.properties;
        streamModel.id = properties.Id;
        streamModel.name = properties.Name;
        streamModel.geometry = feature;
        streamModel.centroidLongitude = properties.CentroidLongitude;
        streamModel.centroidLatitude = properties.CentroidLatitude;
        _.extend(streamModel, properties);
        streamModel.type = 'streamCentroid';
        return streamModel;
      })
      .sortBy('name')
      .indexBy('id')
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

    return stateHash;
  }
}

export default new TableOfContentsApi();
