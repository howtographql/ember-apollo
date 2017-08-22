import Ember from 'ember';
import RSVP from 'rsvp';
import signInUserMutation from 'ember-apollo/gql/mutations/signInUser';
import createUser from 'ember-apollo/gql/mutations/createUser';

const GC_USER_ID = 'graphcool-user-id';
const GC_AUTH_TOKEN = 'graphcool-auth-token';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.getUserId();
    this.getAuthToken();
  },

  apollo: Ember.inject.service(),

  authToken: null,

  getUserId() {
    const userId = localStorage.getItem(GC_USER_ID);
    this.setUserId(userId);
    return userId;
  },

  getAuthToken() {
    const token = localStorage.getItem(GC_AUTH_TOKEN);
    this.setAuthToken(token);
    return token;
  },

  isLoggedIn: Ember.computed('userId', function() {
    return !!this.get('userId');
  }),

  loginOrSignUp(state, name, email, password) {
    let variables;
    return new RSVP.Promise((resolve, reject) => {
      if (state) {
        variables = { email, password };
        this.get('apollo')
          .mutate({ mutation: signInUserMutation, variables }, 'signinUser')
          .then(result => {
            this.saveUserData(result.user.id, result.token);
            resolve();
          })
          .catch(error => reject(error));
      } else {
        variables = { name, email, password };
        this.get('apollo')
          .mutate({ mutation: createUser, variables }, 'signinUser')
          .then(result => {
            this.saveUserData(result.user.id, result.token);
            resolve();
          })
          .catch(error => reject(error));
      }
    });
  },

  logout() {
    return new RSVP.Promise(resolve => {
      this.removeUserId();
      this.removeAuthToken();
      resolve();
    });
  },

  removeUserId() {
    localStorage.removeItem(GC_USER_ID);
    this.set('userId', null);
  },

  removeAuthToken() {
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.set('authToken', null);
  },

  saveUserData(id, token) {
    this.setUserId(id);
    this.setAuthToken(token);
  },

  setUserId(id) {
    localStorage.setItem(GC_USER_ID, id);
    this.set('userId', id);
  },

  setAuthToken(token) {
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.set('authToken', token);
  },

  userId: null
});
