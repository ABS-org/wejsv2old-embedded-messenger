'use strict';
App.register('we-messenger-events:main', Ember.Object.extend(Ember.Evented),{ singleton: true });
App.inject('controller', 'WeMessengerEvents', 'we-messenger-events:main');
App.inject('component', 'WeMessengerEvents', 'we-messenger-events:main');