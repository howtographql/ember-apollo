import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    navigateHome() {
      this.transitionTo('links');
    }
  }
});
