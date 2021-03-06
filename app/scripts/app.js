/* jshint unused: false */
'use strict';

moment.locale('pt-br');

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

App.set('defaultTitle', window.document.title);

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
  opts.accounts = opts.accounts || 'http://localhost:2430';

  WeMessenger.options = opts;

  App.ApplicationAdapter.reopen({
    host: WeMessenger.options.server,
  });

  App.get('auth').setProperties({
    accounts: opts.accounts,
    server: opts.server
  });

  App.ApplicationRoute = Ember.Route.extend({
    beforeModel: function() {
      var self = this;

      return Ember.RSVP.hash({
        // get current user
        currentUser: $.getJSON( WeMessenger.options.accounts + '/account' )
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

  if ( window.createjs ) {
    // Load new-message.mp3 sound to be played on every new private message
    window.createjs.Sound.registerSound('/sounds/new-message.mp3', 'new-message');
    window.createjs.Sound.on('fileload', function (e){
      WeMessenger.sounds = WeMessenger.sounds || {};
      WeMessenger.sounds[e.id] = window.createjs.Sound.createInstance(e.id);
    });
  } else {
    console.log('Warn:: SoundJs library could not be found, mp3 file could not be loaded');
  }

  window.jQuery( window.document ).ready(function () {
    /**
     * Add Accept and Header in all request
     */
    var token = '';

    var authTokenName = opts.authTokenName;
    if ( typeof authTokenName === 'string' ) {
      authTokenName = authTokenName;
    } else {
      authTokenName = 'wetoken';
    }

    if ( options.wetoken ) {
      token = options.wetoken;
    } else {
      token = $.cookie(authTokenName);
    }

    if ( !token ) {
      console.log('WeMessenger:: No authenticated cookie nor token could be inferred');
      console.log('WeMessenger:: Access Denied');
      console.log('WeMessenger:: You gotta login first on CdP server');
      console.log('Options::', options, opts);
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

    $.getJSON(WeMessenger.options.accounts + '/account')
    .done(function (data) {
      App.get('auth').setProperties({
        isAuthenticated: true,
        authToken: token
      });
      window.io.socket = window.io.sails.connect(opts.server);
      App.advanceReadiness();
      // Start timeago countdown
      setInterval(function () {
        $('[data-moment]').each(function (index, item) {
          var $this = $(item);
          var createdAt = $this.data('moment');
          var ago = $this.data('ago') === undefined;
          $this.text(moment(createdAt).fromNow(ago));
        });
      }, 60000);      
    })
    .fail(function (error){
      console.log('WeMessenger:: Access Denied');
      console.log('WeMessenger:: You gotta login first on CdP server');
      // App.set('auth.isAuthenticated', false);
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

require('scripts/autosize');