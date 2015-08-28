'use strict';
/**
* Ember.js user avatar image component visualizer
*
*
* @examples
*   {{user-avatar user=record.creator size="thumbnail"}}
*   {{user-avatar user=record.creator size="large"}}
*
*/

App.UserAvatarComponent = Ember.Component.extend({
  tagName: 'img',

  // default configs
  width: '100%',
  attributeBindings: ['src','width', 'data-lightbox', 'dataToggle:data-toggle', 'dataPlacement:data-placement', 'title'],
  webp: 'auto',
  // medium | thumbnail | original | large
  size: 'medium',
  classNameBindings: ['clickClass'],
  src: null,
  url: null,

  user: null,

  onClick: null,

  // init: function () {
  //   this._super();
  //   // this.set('defaultSrc', WeMessenger.options.server + '/core/images/avatars/user-avatar.png');
  //   this.set('defaultSrc', WeMessenger.options.server + '/');
  // },

  // observer to change image after resolves the image object promisse
  refreshImage: function refreshImage() {
    var src = this.get('user.avatar.urls.' + this.get('size') );
    if (src) {
      this.set('src',  src);
    } else {
      this.set('src', this.get('defaultSrc') );
    }
  }.observes('user.avatar.urls', 'user.avatar.id').on('init'),
  // optional onClick event
  click: function() {
    if (this.get('onClick')) {
      this.sendAction('onClick', this.get('user'), this);
    }
  }
});