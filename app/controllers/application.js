import Ember from 'ember';

const {
  Controller,
  inject: {service}
} = Ember;

export default Controller.extend({
  session: service('session'),
  actions: {
    authenticateSession() {
      this.get('session').authenticate('authenticator:torii', 'google-oauth2')
    }
  }
})
