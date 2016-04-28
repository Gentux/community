import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      apps: this.store.findAll('application'),
      users: this.store.findAll('user'),
      sessions: this.store.findAll('session')
    });
  },
});