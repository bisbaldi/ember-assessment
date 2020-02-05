import Ember from 'ember';
import { task } from 'ember-concurrency';
import jQuery from "jquery";


const {
  RSVP,
  Controller,
  inject: {service},
  get,
  set
} = Ember;

export default Controller.extend({
  session: service('session'),
  uploadPhoto: task(function * (file) {
    let token = this.get('session.data.authenticated.access_token')
    let photo = this.store.createRecord('photo', {
      filename: get(file, 'name'),
      filesize: get(file, 'size'),
      filetype: get(file, 'type')
    });

    try {
      file.readAsDataURL().then(function (url) {
        if (get(photo, 'url') == null) {
          set(photo, 'url', url);
        }
        return new RSVP.Promise((resolve, reject) => {
          return jQuery.ajax('http://localhost:4000/api/images/upload', {
            type: 'POST',
            data: {
              data: photo.url,
              token: token,
              filename: photo.name
            },
            success: resolve,
            error:reject
          })
        })
      });
      } catch (e) {
      console.log(e)
    }
  }).maxConcurrency(3).enqueue(),
  /*return new RSVP.Promise((resolve, reject) => {
        return jQuery.ajax('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', {
          headers: {
            'Authorization': 'Bearer ' + this.get('session.data.authenticated.access_token'),
            'Content-Type': type,
            'Content-Length': size
          },
          type: 'POST',
          data: file.blob[0],
          success: resolve,
          error: reject
        })
      })
  }),*/
  actions: {
    authenticateSession() {
      let session = this.get('session')
      session.authenticate('authenticator:torii', 'google-oauth2').then(() => {
        this.store.queryRecord('user', {}).then((user) => {
          console.log(user);
          session.set('currentUser', user)
        })
      })
    },
    uploadImage(file) {
      get(this, 'uploadPhoto').perform(file);
    },
    logout(){
      let session = this.get('session')
      session.set('currentUser', null)
      session.invalidate()
    }
  },

})
