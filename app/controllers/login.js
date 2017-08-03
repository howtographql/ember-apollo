import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    changeLoginState() {
      this.toggleProperty('loginState');
    },

    loginOrSignUp() {
      const loginState = this.loginState;
      const email = this.get('email');
      const name = this.get('name');
      const password = this.get('password');
      this.get('auth').loginOrSignUp(loginState, name, email, password);
      this.transitionToRoute('/');
    }
  },

  auth: Ember.inject.service(),

  loginState: true
});
