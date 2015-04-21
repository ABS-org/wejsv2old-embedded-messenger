'use strict';
App.MessagesController = Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: true
});