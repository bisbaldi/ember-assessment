import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType){
    console.log(payload);
    let response = { "drive-files": payload.items }
    return this._super(store, primaryModelClass, response, id, requestType);
  }
})
