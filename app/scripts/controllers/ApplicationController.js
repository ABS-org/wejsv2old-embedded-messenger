'use strict';
App.ApplicationController = Ember.ObjectController.extend({
  isAuthenticated: function(){
    return App.get('auth.isAuthenticated');
  }.property('App.auth.isAuthenticated'),
});
