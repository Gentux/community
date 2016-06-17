import DS from 'ember-data';
import Ember from 'ember';
import {validator, buildValidations} from 'ember-cp-validations';

const Validations = buildValidations({
  firstName: [
    validator('presence', true),
    validator('length', {
      min: 2,
      max: 255
    })
  ],
  lastName: [
    validator('presence', true),
    validator('length', {
      min: 2,
      max: 255
    })
  ],
  password: [
    validator('presence', true),
    validator('length', {
      min: 8,
      max: 255,
      type: 'password',
    })
  ],
  passwordConfirmation: [
    validator('confirmation', {
      on: 'password',
      message: 'Does not match password',
    })
  ],
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});

export default DS.Model.extend(Validations, {
  email: DS.attr('string'),
  activated: DS.attr('boolean'),
  isAdmin: DS.attr('boolean'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  password: DS.attr('string'),
  signupDate: DS.attr('utc'),

  fullName: function() {
    return `${this.get('firstName')}  ${this.get('lastName')}`;
  }.property('firstName', 'lastName'),
  isNotAdmin: function() {
    return !this.get('isAdmin');
  }.property(),
  type: Ember.computed('isAdmin', 'isAdmin', function() {
    return this.get('isAdmin') ? 'Administrator' : 'Regular user';
  }),
});
