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
      const controller = this.get('controller');
      const description = controller.get('description');
      const url = controller.get('url');
      let variables = { description, url, postedById };

      return this.get('apollo')
        .mutate(
          {
            mutation,
            variables,
            update(store, { data: { createLink } }) {
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
          controller.set('description', '');
          controller.set('url', '');
          this.transitionTo('links');
        });
    }
  },

  apollo: Ember.inject.service(),

  auth: Ember.inject.service()
});
