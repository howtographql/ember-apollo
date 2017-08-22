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
      return this.get('auth')
        .loginOrSignUp(loginState, name, email, password)
        .then(() => {
          this.transitionToRoute('/');
        })
        .catch(error => alert(error));
    }
  },

  auth: Ember.inject.service(),

  loginState: true
});
