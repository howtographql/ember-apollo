import Ember from 'ember';
import UnsubscribeRoute from 'ember-apollo-client/mixins/unsubscribe-route';
import query from 'ember-apollo/gql/queries/allLinks';

export default Ember.Route.extend(UnsubscribeRoute, {
  apollo: Ember.inject.service(),

  model() {
    return this.get('apollo').query({ query }, 'allLinks').then(result => {
      return result;
    });
  }
});
