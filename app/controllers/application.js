import Ember from 'ember';

const {
  Controller,
  inject: {service}
} = Ember;

export default Controller.extend({
  session: service('session'),
  actions: {
    authenticateSession() {
      let session = this.get('session')
      session.authenticate('authenticator:torii', 'google-oauth2').then(() => {
        this.store.queryRecord('user', {}).then((user) => {
          console.log(user);
          session.set('currentUser', user)
        })
      })
    }
  }
})
