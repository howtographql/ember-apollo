import Ember from 'ember';
import createVote from 'ember-apollo/gql/mutations/createVote';
import allLinks from 'ember-apollo/gql/queries/allLinks';

export default Ember.Component.extend({
  actions: {
    voteForLink(votes, linkId) {
      const userId = this.get('auth').getUserId();
      const voterIds = votes.map(vote => vote.user.id);
      if (voterIds.includes(userId)) {
        console.error(`User (${userId}) already voted for this link.`);
        return;
      }

      return this.get('apollo').mutate(
        {
          mutation: createVote,
          variables: { userId, linkId },
          update: (store, { data: { createVote } }) => {
            const data = store.readQuery({ query: allLinks });
            const votedLink = data.allLinks.find(link => link.id === linkId);
            votedLink.votes = createVote.link.votes;
            store.writeQuery({ query: allLinks, data });
          }
        },
        'createVote'
      );
    }
  },

  apollo: Ember.inject.service(),

  auth: Ember.inject.service(),

  userLoggedIn: Ember.computed.oneWay('auth.isLoggedIn')
});
