'use strict';
Ember.Handlebars.helper('format-date', function(date, options) {
  if (options.hash.bool && options.hash.bool === 'true') {
    return new Ember.Handlebars.SafeString('<span data-moment="' + date + '">' + moment(date).fromNow(true) + '</span>');
  }
  return new Ember.Handlebars.SafeString('<span data-ago data-moment="' + date + '">' + moment(date).fromNow() + '</span>');
});