import GoogleAdapter from './google';

export default GoogleAdapter.extend({
  namespace: 'drive/v2',
  pathForType(){
    return 'files'
  }
})
