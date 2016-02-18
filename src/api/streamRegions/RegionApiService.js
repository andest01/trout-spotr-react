'use strict';
import BaseApi from '../BaseApi';

export class TableOfContentsApi extends BaseApi {
    constructor (settings, cache = null) {
      super(settings, cache);
    }

    getRegion (stateId, regionId) {
      var createPath = (stateId, regionId) => {
        return stateId + '/' + regionId + '.topo.json';
      };

      if (stateId == null) {
        throw new Error('stateId cannot be null');
      }

      if (regionId == null) {
        throw new Error('regionId cannot be null');
      }

      var path = createPath(stateId, regionId);
      return super.get('assets/data/' + path);
    }
}

export default new TableOfContentsApi();
