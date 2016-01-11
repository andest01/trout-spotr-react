import axios from 'axios';
// import config from '../config';

export default class BaseApi {
  constructor (settings, cache) {
    this.settings = settings;
    this.cache = cache;
  }

  constructEndpoint (endpoint) {
    return this.apiRoot + endpoint;
  }

  get apiRoot () {
    return '/data/';
  }

  clearCache () {
    return;
  }

  get (endpoint, data) {
    var fullEndpoint = this.constructEndpoint(endpoint);
    return axios.get(fullEndpoint, data)
      .then((response) => {
        return response.data;
      });
  }

  put (endpoint, data) {
    var fullEndpoint = this.constructEndpoint(endpoint);
    return axios.put(fullEndpoint, data);
  }

  delete (endpoint) {
    var fullEndpoint = this.constructEndpoint(endpoint);
    return axios['delete'](fullEndpoint);
  }

  patch (endpoint, data) {
    var fullEndpoint = this.constructEndpoint(endpoint);
    return axios.patch(fullEndpoint, data);
  }

  post (endpoint, data) {
    var fullEndpoint = this.constructEndpoint(endpoint);
    return axios.post(fullEndpoint, data);
  }

  saveObject (selfReferencingObject) {
    return axios.put(selfReferencingObject._links.self.href, selfReferencingObject);
  }
}
