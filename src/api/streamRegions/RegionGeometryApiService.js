'use strict';
import BaseApi from '../BaseApi';
import RegionApiService from './RegionApiService';

export class RegionGeometryService extends BaseApi {
  getCacheKey () {
    var REGION_CACHE_KEY = 'region';
    return REGION_CACHE_KEY;
  }

  createKey (stateId, regionId) {
    var REGION_CACHE_KEY = this.getCacheKey();
    return REGION_CACHE_KEY + '_' + stateId + '_' + regionId;
  }

  getRegion (stateModel, regionModel) {
    if (stateModel == null || stateModel.shortName == null) {
      throw new Error('state cannot be null');
    }

    if (regionModel == null || regionModel.shortName == null) {
      throw new Error('region cannot be null');
    }

    var stateId = stateModel.shortName;
    var regionId = regionModel.shortName;
    var regionKey = this.createKey(stateId, regionId);

    if (this.cache.get(regionKey)) {
      console.log('found in cache');
      return this.cache.get(regionKey);
    }

    var promise = RegionApiService.getRegion(stateId, regionId)
      .then(geometry => {
        return geometry;
      });

    this.cache.put(regionKey, promise);
    return promise;
  }
}

export default new RegionGeometryService();
