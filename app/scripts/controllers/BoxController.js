'use strict';

App.BoxController = Ember.ObjectController.extend({
  messageNew: '',
  contact: {},
  messages: Ember.NativeArray.apply([]),
  isListOpen: true, // show | close
  //flags
  isVisible: true,
  isWriting: false,
  isContactWritingTime: 2000,

  iAmWritingTimeout: false,
  isWritingTime: 3500,
  // placeholder for message input
  messagePlaceholder: '',

  socket: null,

  // flag to check if this box is scrolled and disable goToBotton feature
  isScrolled: false,

  hasNews: false,
  hasFocus: false,
  isStarted: false,

  count: null,
  limit: 15,
  page: 1,

  // element with messages and scrollbar
  messagesElementSelector: '.messages',

  isOnline: function(){
    if( this.get('model.messengerStatus') === 'online' ) {
      return true;
    }
    return false;
  }.property('model.messengerStatus'),

  boxId: function() {
    return 'messengerBox-'+ this.get('id');
  }.property('id'),

  goToBottomTimeOut: null,

  sendIsWriting: function() {
    if( this.get('messageNew').trim() ) {
      this.send('emitIsWriting');
    }

  }.observes('messageNew'),

  goToBottomOnUpdate: function() {
    if ( !this.get('isScrolled') ) {
      this.send('scrollToBottom');
    }

    if( this.get('isStarted') && !this.get('hasFocus') ) {
      this.set('hasNews', true);
    }

    Ember.run.scheduleOnce('afterRender', this, function (){
      var lastMessage = this.get('messages.lastObject');
      if ( !this.get('hasFocus') && !lastMessage.get('read') ) {
        // Play sound
        if ( WeMessenger.sounds['new-message'] ) {
          WeMessenger.sounds['new-message'].play();
          window.document.title = this.get('model.username') + ' | ' + App.get('defaultTitle');
        } else {
          console.log('Warn:: could not find `new-message` key on loaded sound files, hence the execution was prevented');
        }
      }
    });
  }.observes('messages.@each'),

  init: function() {
    this._super();
    var self = this;
    var contactId = self.get('model.id');

    if( contactId ) {
      this.getMessagesWithUser().then(function (){
        Ember.run.scheduleOnce('afterRender', self, function() {
          this.send('scrollToBottom');
        });
      });
    }

    if( !this.get('socket') ){
      if(window.io && window.io.socket){
        this.set('socket', window.io.socket);
      } else {
        return console.error('Socket.io not found in App.WeMessengerComponent.init()');
      }
    }

    /**
     * Filter messaget with authenticaded user and contact user id
     */
    this.get('store').filter('message',
      function(message) {
        // check if are a message to authenticated user
        // form contact user id
        if(
          message.get('toId.id') === App.currentUser.id &&
          message.get('fromId.id') === contactId
        ) {
          return true;
        }
        // check if are a message from authenticated user
        // to box user id
        if(
          message.get('fromId.id') === App.currentUser.id &&
          message.get('toId.id') === contactId
        ) {
          return true;
        }
        return false;
      }
    ).then(function (messages){
      self.set('messages', messages);
    });

    /**
     * Receive a user is writing notification
     * @param  Object data
     */
    this.get('socket').on('user:writing', this.onContactWriting.bind(this));
  },

  onContactWriting: function(data) {
    var self = this;

    if (data.user && data.user.id) {
      if ( Number( this.get('model.id') ) === data.user.id && !this.get('isWriting') ) {
        // set one delay for re-send this event
        self.set('isWriting', true);
        setTimeout(function isWritingTime(){
          self.set('isWriting', false);
        }, self.get('isContactWritingTime'));
      }
    }
  },

  willDestroyElement: function(){
    this._super();
    this.get('socket').removeListener('user:writing', this.onContactWriting.bind(this));
  },

  /**
   * Get messages how authenticated user has did with user id
   */
  getMessagesWithUser: function messagesWithUser(){
    var self = this;

    self.set('isLoading', true);
    var id = self.get('model.id');

    return self.get('store').find('message', {
      uid: id,
      limit: this.get('limit'),
      skip: ( this.get('page') - 1 ) * this.get('limit')
    }).then(function (privateMessages) {
      if ( privateMessages && privateMessages.meta ) {
        self.set('count', privateMessages.meta.count);
      }

      self.set('isLoading', false);
      self.set('isStarted', true);
    });
  },

  actions: {
    scrollAtTop: function (messageArea, previousHeight){
      var self = this;
      if ( this.get('messages.length') < this.get('count') ) {
        this.incrementProperty('page');
        // this.send('getMessagesPublic');
        this.getMessagesWithUser().then(function (){
          Ember.run.scheduleOnce('afterRender', self, function() {
            messageArea.scrollTop( messageArea[0].scrollHeight - previousHeight );
          });
        });
      }
    },

    lockScroll: function lockScroll (flag) {
      this.set('isScrolled', flag);
    },

    focusToggle: function(flag) {
      this.set('hasFocus', flag);
      // has focus
      if( flag && this.get('isListOpen') ) {
        this.set('hasNews', false);
        this.send('markAllAsRead');
      }
    },

    /**
     * Mark all unread messages as read
     *
     */
    markAllAsRead: function( ) {
      var messages = this.get('messages');

      messages.forEach(function(message){
        if ( !message.get('read') ) {
          // only mark as read messages how you received
          if( message.get('fromId.id') !== App.currentUser.id) {
            message.set('read', true);
            message.save();
          }
        }
      });

      this.set('model.unreadMessages', null);

      window.document.title = App.get('defaultTitle');
    },

    openList: function(){
      this.set('isVisible', 'show');
    }.observes('messages'),

    closeList: function() {
      this.set('model.isTalking', false);
    },

    toggleList: function() {
      this.toggleProperty('isListOpen');
      if (this.get('isListOpen')) {
        this.send('scrollToBottom');
      }
    },

    scrollToBottom: function(){
      var self = this;

      // use one timeout to delay scroll and run after render messages inside the message box
      setTimeout(function(){
        var element = $( '#' + self.get('boxId') );
        if(element && element.scrollTop){
          element.scrollTop(element.prop('scrollHeight'));
        }
      }, 10);
    },

    sendMessage: function sendMessageToContact(){
      var self = this;
      // if is empty messageNew ...
      if( !this.get('messageNew') ){
        return;
      }

      var message = self.get('store').createRecord('message', {
        content: self.get('messageNew'),
        toId: self.get('model'),
        fromId: App.currentUser,
        createdAt: new Date(),
        status: 'sending'
      });
      // clean input box
      self.set('messageNew', '');
      // scroll to bottom after send a message
      self.send('scrollToBottom');

      message.save().then(function() {
        setTimeout(function(){
          message.set('status', 'salved');
        }, 3000);
        message.set('status', 'send');
      },function(e){
        console.warn('err:',e);
      });
    },

    /**
     * Send one i am writing event to other contact
     *
     * @param  {string}   contactId contact id
     * @param  {Function} callback  optional callback(err, response)
     */
    emitIsWriting: function emitIsWriting(){
      var self = this;
      var contactId = self.get('model.id');

      // only send this event every "isWritingTime" secconds
      if( !self.get('iAmWritingTimeout') ){
        this.get('socket').post('/messenger/user/writing?access_token=' + App.get('auth.authToken'), {
          toUserId: contactId
        },function(resp, jwres){
          if(jwres.statusCode && jwres.statusCode !== 200) {
            Ember.Logger.error('Error on emitIsWriting',resp);
          }
        });
        // set one delay for re-send this event
        self.set('iAmWritingTimeout', setTimeout(function(){
          self.set('iAmWritingTimeout', false);
        }, self.get('isWritingTime') ));
      }
    }
  } // end actions
});