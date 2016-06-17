import Ember from 'ember';

export default Ember.Controller.extend({

  passwordConfirmation: null,
  isMe: Ember.computed('session.user', 'model', function() {
    return this.get('model.id') === this.get('session.user.id');
  }),

  actions: {

    removeDone: function() {
      this.get('model').destroyRecord();
      this.transitionToRoute('protected.users');
    },

    toggleEditPassword: function() {
      this.set('model.password', "");
      this.set('passwordConfirmation', "");
    },

    updateRank: function(defer) {
      let model = this.get('model');
      model.toggleProperty('isAdmin');
      model.validate({ on: ['isadmin'] })
        .then(({ m, validations }) => {

          if (validations.get('isInvalid') === true) {
            this.toast.error(this.get('model.validations.attrs.isadmin.messages'));
            return defer.reject(this.get('model.validations.attrs.isadmin.messages'));
          }

          this.model.save()
            .then(() => {
              this.send('refreshModel');
              this.toast.success('Rank has been updated successfully');
            }, () => {
              this.toast.error("Rank has not been updated");
            });
        });
    },

    changeEmail: function(defer) {
      this.get('model')
        .validate({ on: ['email'] })
        .then(({ m, validations }) => {

          if (validations.get('isInvalid') === true) {
            this.toast.error(this.get('model.validations.attrs.email.messages'));
            return defer.reject(this.get('model.validations.attrs.email.messages'));
          }

          this.model.save()
            .then(() => {
              defer.resolve();
              this.send('refreshModel');
              this.toast.success('Email has been updated successfully');
            }, () => {
              defer.reject();
              this.toast.error("Email has not been updated");
            });
        });
    },

    changeFirstName: function(defer) {

      this.get('model')
        .validate({ on: ['firstName'] })
        .then(({ m, validations }) => {

          if (validations.get('isInvalid') === true) {
            this.toast.error(this.get('model.validations.attrs.firstname.messages'));
            return defer.reject(this.get('model.validations.attrs.firstname.messages'));
          }

          this.model.save()
            .then(() => {
              defer.resolve();
              this.send('refreshModel');
              this.toast.success('First name has been updated successfully');
            }, () => {
              defer.reject();
              this.toast.error("First name has not been updated");
            });
        });
    },

    changeLastName: function(defer) {

      this.get('model')
        .validate({ on: ['lastName'] })
        .then(({ m, validations }) => {

          if (validations.get('isInvalid') === true) {
            this.toast.error(this.get('model.validations.attrs.lastname.messages'));
            return defer.reject(this.get('model.validations.attrs.lastname.messages'));
          }

          this.model.save()
            .then(() => {
              defer.resolve();
              this.send('refreshModel');
              this.toast.success('Last name has been updated successfully');
            }, () => {
              defer.reject();
              this.toast.error("Last name has not been updated");
            });
        });
    },

    changePassword: function(defer) {

      this.get('model')
        .validate({ on: ['password'] })
        .then(({ m, validations }) => {

          if (validations.get('isInvalid') === true) {
            this.toast.error(this.get('model.validations.attrs.password.messages'));
            return defer.reject(this.get('model.validations.attrs.password.messages'));
          }

          if (this.get('model.password') !== this.get('passwordConfirmation')) {
            this.toast.error("Password doesn't match confirmation");
            return defer.reject("Password does not match confirmation");
          }

          this.model.save()
            .then(() => {
              defer.resolve();
              this.send('toggleEditPassword');
              this.toast.success('Password has been updated successfully');
            }, () => {
              defer.reject();
              this.toast.error("Password has not been updated");
            });
        });
    }
  }
});
