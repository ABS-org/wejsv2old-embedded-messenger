'use strict';
App.inject( 'component:we-messenger', 'store', 'store:main' );
App.WeMessengerComponent = Ember.Component.extend({
  // contacts on list
  contacts: Ember.NativeArray.apply([]),
  // open contact box
  openContacts: Ember.NativeArray.apply([]),
  isListOpen: true,
  socket: null,
  reconnected: false,
  isActive: false,
  resolvedContacts: function (){
    var self = this;
    var criteria = this.get('srcCriteria');
    if ( Ember.isEmpty(criteria) ) {
      return this.set('filteredContacts', this.get('contacts'));
    } else {
      return this.set('filteredContacts', this.get('contacts').filter(function (user){
        var displayName = self.removeSomeSpecialCharacters(user.get('displayName').toLowerCase());
        var adjCriteria = self.removeSomeSpecialCharacters(criteria.toLowerCase());
        var bool = displayName.indexOf(adjCriteria) !== -1;
        return bool;
      }));
    }
  }.observes('srcCriteria', 'contacts.[]').on('init'),

  init: function initWeMessengerComponent(){
    this._super();

    // if (window.localStorage.weMessengerIsListStatus == 'close') {
    //   this.set('isListOpen', false);
    // }

    if ( $.cookie('weMessengerIsListStatus') === 'close' ) {
      this.set('isListOpen', false);
    }

    if( !this.get('socket') ){
      if(window.io && window.io.socket){
        this.set('socket', window.io.socket);
      } else {
        return console.error('Socket.io not found in App.WeMessengerComponent.init()');
      }
    }

    // if (window.localStorage.weMessengerIsActive != 'off') this.send('turnOn');
    if ( $.cookie('weMessengerIsActive') !== 'off' ) {
      this.send('turnOn');
    }
  },
  didInsertElement: function didInsertElement() {
    if (!this.get('store')) {
      throw 'WeMessengerComponent requires store for autocomplete feature. Inject as store=store';
    }

    this.$().on('calculateBoxSize', this.calculateBoxSize.bind(this.$()));
    $(window).resize(this.calculateBoxSize.bind(this.$()));
    var $this = this.$();
    $this.on('click', '.messenger-column:not(:first)', function (){
      $(this).css('z-index', 0);
      $this.find('.messenger-column').not(this).css('z-index', -1);
    });
  },
  willDestroyElement: function willDestroyElement(){
    console.warn('TODO! willDestroyElement unsubscribe from events here', this);
  },
  actions: {
    turnOn: function() {
      var self = this;

      this.set('isActive', true);
      // window.localStorage.weMessengerIsActive = 'on';
      $.cookie('weMessengerIsActive', 'on');

      if( !this.get('socket') ){
        if(window.io && window.io.socket){
          this.set('socket', window.io.socket);
        } else {
          return console.error('Socket.io not found in App.WeMessengerComponent.init()');
        }
      }

      // set a filter to list connected users
      this.set('contacts', this.get('store').filter('user', function (user) {
        return ( user.get('messengerStatus') === 'online' || user.get('unreadMessages') > 0 );
        // body...
      }));

      self.getMessages();

      // filter to show only open contacts
      this.set('openContacts', this.get('store').filter('user', function (user) {
        return user.get('isTalking');
      }));

      self.setMessengerEvents();
      // start the messenger and send is connected message to authenticated user contacts
      Ember.run.later(self, function() {
        self.send('startMessenger');
      }, 1500);

      self.get('WeMessengerEvents').on('we-messenger-contact-connected',function(user){
        var contactToAdd = self.get('store').push('user', user);
        contactToAdd.set('messengerStatus', 'online');
      });

      self.get('WeMessengerEvents').on('we-messenger-contact-diconnected',function(user){
        var contactToRemove = self.get('contacts').findBy('id', String(user.id));
        contactToRemove.set('messengerStatus', 'offline');
      });

      self.get('WeMessengerEvents').on('we-messenger-message-received', function OnReceiveMessage(socketMessage) {
        self.get('store').pushPayload('message', {
          message: socketMessage.message
        });
        socketMessage.message.fromId.set('isTalking', true);
      });

      self.get('WeMessengerEvents').on('we-messenger-updated-message', function OnReceiveMessage(socketMessage) {
        self.get('store').pushPayload('message', {
          message: socketMessage.message
        });
      });
    },
    turnOff: function() {
      if ( window.confirm('Ao desligar o comunicador você não vai poder enviar ou receber mensagens.'+
        ' Você term certeza que deseja desligar o comunicador?')){
        this.set('isActive', false);
        // window.localStorage.weMessengerIsActive = 'off';
        $.cookie('weMessengerIsActive', 'off');
        // TODO turn off without reload
        window.location.reload();
      }
    },

    openList: function openList(){
      // window.localStorage.weMessengerIsListStatus = 'open';
      $.cookie('weMessengerIsListStatus', 'open');
      this.set('isListOpen', true);
      //this.get('openContacts').pushObject({      name: 'oi2',})
    },
    closeList: function closeList(){
      // window.localStorage.weMessengerIsListStatus = 'close';
      $.cookie('weMessengerIsListStatus', 'close');
      this.set('isListOpen', false);
    },
    startTalk: function startTalk(contact) {
      contact.set('isTalking', true);
    },
    openPublicBox: function openPublicBox() {
      this.get('WeMessengerEvents').trigger('weMessengerOpenPublicBox');
    },

    /**
     * Start messenger, use to check if user is logged in and have permissions to use the messenger.
     * And to send a is connected message to yours contacts
     */
    startMessenger: function startMessenger() {
      var self = this;
      this.get('socket').get('/messenger/start?access_token=' + App.get('auth.authToken'), function (response) {
        if( response.status === 200 || !response.status ){
          // can use the messenger
          if ( response.usersOnline ) {
            self.get('store').pushMany('user', response.usersOnline);
          }
        }else{
          // error code like 403
          console.error(response);
        }
      });
    },

    // /**
    //  * Load in store all contacts for current authenticated user
    //  */
    // getContactList: function getContactList(){
    //   this.get('store').find('contact');
    // }
  },

  calculateBoxSize: function calculateBoxSize(){
    Ember.run.scheduleOnce('afterRender', this, function (){
      var mainBoxWidth = this.find('.contacts').outerWidth(true);
      var preservedArea = $( window ).width() - mainBoxWidth;

      var messagesBox = this.find('.messenger-column:not(.contacts)').filter(':visible');
      var compiledWidth = messagesBox.get().reduce(function (p,c) {
        return p + $(c).outerWidth(true);
      }, 0);

      var diff = preservedArea - compiledWidth;
      var offset;
      if ( diff < 0 ) {
        offset = Math.abs(diff) / ( messagesBox.length - 1 );
      }
      messagesBox.each(function (i){
        var newRight = mainBoxWidth * (i + 1);
        if ( offset && i > 0 ) {
          newRight-=( offset * i );
        }
        $(this).css('right', newRight);
      });
    });
  },

  getMessages: function getMessages(){
    // TODO change to use WEjs get messages
    var store = this.get('store');
    return $.getJSON(WeMessenger.options.server + '/message/unreadMessages')
    .then(function ( data ){
      var messages = window._.cloneDeep( data.messages ) || [];
      if ( !messages.length ) {
        return;
      }

      store.pushPayload('message', data);

      var usersId = messages.reduce(function (p, c){
        return p.concat([c.fromId]);
      }, []);

      var objCountable = {};
      messages.forEach(function (m){
        objCountable[m.fromId] = objCountable[m.fromId] || 0;
        objCountable[m.fromId]++;
      });

      usersId = window._.uniq(usersId);

      store.find('user', {
        id: usersId
      }).then(function (users){
        users.forEach(function (user){
          user.set('unreadMessages', objCountable[user.id]);
        });
      }).fail(function ( error ){
        console.warn('Could not load user related to messages', error);
      });
    }, function ( error ){
      console.warn('Could not load unread messages', error);
    });
  },

  isOpenContactBox: function isOpenContactBox(userId){
    var openContacts = this.get('openContacts');
    var len = openContacts.length;
    for(var i=0; i < len; i++){
      if(openContacts[i].id === userId){
        return true;
      }
    }
    return false;
  },
  getUserFromContacts: function getUserFromContacts(userId){
    var contacts = this.get('contacts');
    var len = contacts.length;
    for(var i=0; i < len; i++){
      if(contacts[i].id === userId){
        return contacts[i];
      }
    }
    return false;
  },

  /**
   * Set socket.io messenger events
   */
  setMessengerEvents: function setMessengerEvents(){
    var self = this;
    var socket = this.get('socket');
    /**
     * Receive a we.io message
     * @param  Object data
     */
    socket.on('receive:message', function(data) {
      if( !App.get('auth.isAuthenticated') ) {
        return false;
      }
      if( data.message ){
        self.get('WeMessengerEvents').trigger('we-messenger-message-received', data);
      }
    });

    /**
     * Receive a bublic message
     * @param  Object data
     */
    socket.on('receive:public:message', function(data) {
      if( !App.get('auth.isAuthenticated') ) {
        return false;
      }
      if( data.message && data.message.fromId !== App.currentUser.id ){
        // we.messenger.publicRoom.messages.push(data.message);
        self.get('WeMessengerEvents').trigger('weMessengerPublicMessageReceived', data);
      }
    });

    /**
     * Receive a message update
     * @param  Object data
     */
    socket.on('update:message', function(data) {
      if( !App.get('auth.isAuthenticated') ) {
        return false;
      }
      if( data.message ){
        self.get('WeMessengerEvents').trigger('we-messenger-updated-message', data);
      }
    });

    /**
     * Message receved after a contact connect
     * @param  object data
     */
    socket.on('contact:connect', function(data) {
      if(!App.get('auth.isAuthenticated')) {
        return false;
      }
      var contact = data.item;

      if(App.currentUser.id !== contact.id){
        // set default values for every contact
        if( !contact.messages ){
          contact.messages = Ember.NativeArray.apply([]);
        }
        if(!contact.messengerBox){
          contact.messengerBox = {};
        }
        self.get('WeMessengerEvents').trigger('we-messenger-contact-connected', contact);
      }
    });

    /**
     * Message receveid after a contact disconect
     * @param  object data
     */
    socket.on('contact:disconnect', function(data) {
      if(!App.get('auth.isAuthenticated')) {
        return false;
      }
      if( data.item && data.item.id ){
        self.get('WeMessengerEvents').trigger('we-messenger-contact-diconnected', data.item);
      }
    });


    /**
     * Socket lost connection and successfully reconnected
     */
    socket.on('reconnect', function() {
      self.set('reconnected', true);
    });

    /**
     * Socket lost connection and successfully reconnected/connected
     */
    socket.on('connect', function() {
      if ( self.get('reconnected') ){
        self.send('startMessenger');
      }
    });
  }
});