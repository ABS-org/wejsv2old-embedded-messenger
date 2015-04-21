'use strict';
App.ContactController = Ember.ObjectController.extend({
  contactClass: function() {
    if(this.get('model.messengerStatus')) {
      return 'contact ' + this.get('model.messengerStatus');
    } else {
      return 'contact offline';
    }
  }.property('model.messengerStatus'),

  isOnline: function(){
    if( this.get('model.messengerStatus') === 'online' ) {
      return true;
    }
    return false;
  }.property('model.messengerStatus')
});