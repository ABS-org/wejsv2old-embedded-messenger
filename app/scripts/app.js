/* jshint unused: false */
'use strict';

Ember.weMessenger = Ember.Namespace.create();
Ember.weMessenger.VERSION = '1.0.0';

Ember.libraries.register('WeMessenger', Ember.weMessenger.VERSION);

if ( window.WeMessenger ) {
  return console.log('Namespace already taken. Exiting script...');
}

var WeMessenger = window.WeMessenger = {};

var rootElement = window.document.createElement('div');
rootElement.setAttribute('id', 'we-mesenger');
( window.document.getElementsByTagName('body')[0] ).appendChild(rootElement);

var App = window.App = WeMessenger.App = Ember.Application.create({rootElement: rootElement});
App.deferReadiness();

// basic logging of successful transitions
App.set('LOG_TRANSITIONS', true);
// detailed logging of all routing steps
App.set('LOG_TRANSITIONS_INTERNAL', true);
App.set('LOG_VIEW_LOOKUPS', true);

// Remove changes to URL
App.Router = Ember.Router.extend({
  location: 'none'
});

App.auth = Ember.Object.create({
  isAuthenticated: false,
  authToken: null
});

WeMessenger.initialize = function (options){
  var opts = options || {};
  opts.server = opts.server || 'http://localhost:1420';

  WeMessenger.options = opts;

  App.ApplicationAdapter.reopen({
    host: WeMessenger.options.server,
  });

  App.ApplicationRoute = Ember.Route.extend({
    beforeModel: function() {
      var self = this;

      return Ember.RSVP.hash({
        // get current user
        currentUser: $.getJSON( WeMessenger.options.server + '/account' )
          .done(function afterLoadCurrentUser(data) {
            if (data.user) {
              App.set('currentUser', self.store.push('user', data.user));
            }
          })
          .fail(function(data) {
            Ember.Logger.error('Error on get current user data' , data);
          })
      });
    },
  });


  App.UserAvatarComponent.reopen({
    init: function () {
      this._super();
      this.set('defaultSrc', WeMessenger.options.server + '/core/images/avatars/user-avatar.png');
    },
  });

  App.WeMessengerPublicBoxComponent.reopen({
    cdpLoading: WeMessenger.options.server + '/core/images/loading.gif'
  });

  App.BoxController.reopen({
    cdpLoading: WeMessenger.options.server + '/core/images/loading.gif',
    cdpOnline: WeMessenger.options.server + '/core/images/connected.png',
    cdpOffline: WeMessenger.options.server + '/core/images/disconnected.png'
  });

  App.ContactController.reopen({
    cdpOnline: WeMessenger.options.server + '/core/images/connected.png'
  });

  window.jQuery( window.document ).ready(function (){
    /**
     * Add Accept and Header in all request
     */
    var token = '';

    var authTokenName = opts.authTokenName;
    authTokenName = ( typeof authTokenName === 'string' ) || 'wetoken';

    if ( opts.wetoken ) {
      token = opts.wetoken;
    } else {
      token = $.cookie(authTokenName);
    }

    if ( !token ) {
      console.log('WeMessenger:: No authenticated cookie nor token could be inferred');
      console.log('WeMessenger:: Access Denied');
      console.log('WeMessenger:: You gotta login first on CdP server');
      App.set('auth.isAuthenticated', false);
      return;
    }

    $.ajaxPrefilter(function( options ) {
      if ( !options.beforeSend ) {
        options.beforeSend = function (xhr) {
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.setRequestHeader('Authorization','Bearer ' + token);
        };
      }
    });

    $.getJSON(WeMessenger.options.server + '/account')
    .done(function (data) {
      App.get('auth').setProperties({
        isAuthenticated: true,
        authToken: token
      });
      window.io.socket = window.io.sails.connect(opts.server);
      App.advanceReadiness();
    })
    .fail(function (error){
      console.log('WeMessenger:: No authenticated cookie nor token could be inferred');
      console.log('WeMessenger:: Access Denied');
      console.log('WeMessenger:: You gotta login first on CdP server');
      App.set('auth.isAuthenticated', false);
      return;
    });
  });
};

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/helpers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/components/*');
require('scripts/router');
require('scripts/injections/*');