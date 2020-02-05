import GoogleAdapter from './google';

export default GoogleAdapter.extend({
  namespace: '/upload/drive/v3',
  pathForType(){
    return 'files?uploadType=media'
  }
})
