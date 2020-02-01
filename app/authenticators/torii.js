import Torii from 'ember-simple-auth/authenticators/torii';
import Ember from 'ember';
import ENV from '../config/environment'
import jQuery from 'jquery'

const {
  RSVP,
  inject: {service}
} = Ember;

export default Torii.extend({
  torii: service('torii'),
  authenticate(provider, options){
    return this.get('torii').open(provider, options).then((authResponse) => {
      return new RSVP.Promise((resolve, reject) => {
        return jQuery.ajax('http://localhost:4000/api/auth', {
          type: 'POST',
          data: {
            code: authResponse.authorizationCode,
            redirect_uri: authResponse.redirectUri,
            client_id: ENV.torii.providers["google-oauth2"].apiKey
          },
          success: resolve,
          error: reject
        })
      })
    });
  }
})
