import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    logout() {
      this.get('auth').logout().then(() => {
        this.sendAction('onLogout');
      });
    }
  },

  auth: Ember.inject.service(),

  userLoggedIn: Ember.computed.oneWay('auth.isLoggedIn')
});
