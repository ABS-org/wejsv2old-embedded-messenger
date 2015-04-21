'use strict';
App.MessageController = Ember.ObjectController.extend({
  messageClass: function(){
    return 'message ' + this.get('status');
  }.property('status')
});