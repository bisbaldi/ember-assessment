import GoogleAdapter from './google';

export default GoogleAdapter.extend({
  namespace: 'oauth2/v2',
  pathForType(){
    return 'userinfo'
  }
})
