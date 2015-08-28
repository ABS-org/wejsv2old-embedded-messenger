Ember.Handlebars.helper('unread-messages', function(value) {
  if ( value ) {
		return new Handlebars.SafeString( '(' + value + ')');
  }
  return value;
});