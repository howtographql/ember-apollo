import Ember from 'ember';
import mutation from 'ember-apollo/gql/mutations/createLink';
import allLinks from 'ember-apollo/gql/queries/allLinks';

export default Ember.Controller.extend({
  actions: {
    createLink() {
      const postedById = this.get('auth').getUserId();
      if (!postedById) {
        console.error('No user logged in');
        return;
      }
      const description = this.get('description');
      const url = this.get('url');
      let variables = { description, url, postedById };

      return this.get('apollo')
        .mutate(
          {
            mutation,
            variables,
            update: (store, { data: { createLink } }) => {
              const data = store.readQuery({ query: allLinks });
              data.allLinks.splice(0, 0, createLink);
              store.writeQuery({
                query: allLinks,
                data
              });
            }
          },
          'createLink'
        )
        .then(() => {
          this.set('description', '');
          this.set('url', '');
          this.transitionToRoute('links');
        })
        .catch(error => alert(error));
    }
  },

  apollo: Ember.inject.service(),

  auth: Ember.inject.service()
});
