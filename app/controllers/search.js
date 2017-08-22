import Ember from 'ember';
import query from 'ember-apollo/gql/queries/allLinksSearch';

export default Ember.Controller.extend({
  actions: {
    executeSearch() {
      const searchText = this.get('searchText');
      if (!searchText) return console.error('No search text provided.');
      return this.get('apollo')
        .queryOnce({ query, variables: { searchText } }, 'allLinks')
        .then(result => {
          this.set('model', result);
        })
        .catch(error => alert(error));
    }
  },

  apollo: Ember.inject.service()
});
