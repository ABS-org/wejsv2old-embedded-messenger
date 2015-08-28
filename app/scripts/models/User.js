'use strict';
App.User = DS.Model.extend({
  idInProvider: DS.attr('string', { }),
  username: DS.attr('string', { }),
  biography: DS.attr('string', {  }),
  gender: DS.attr('string', { }),
  email: DS.attr('string', {  }),
  password: DS.attr('string', { }),
  displayName: DS.attr('string', {  }),
  birthDate: DS.attr('date', {  }),
  avatar: DS.belongsTo('images', {
    async: true
  }),
  active: DS.attr('boolean', {  }),
  isAdmin: DS.attr('boolean', { }),
  isModerator: DS.attr('boolean', { }),
  language: DS.attr('string', {
     defaultValue: 'pt-br'
  }),
  locationState: DS.attr('string', {  }),
  city: DS.attr('string', { }),
  emailNotificationFrequency: DS.attr('string', {
     defaultValue: 'instant'
  }),
  cpf: DS.attr('string'),
  fullName: DS.attr('string'),
  major: DS.attr('string'),
  grade: DS.attr('string'),
  fbprofile: DS.attr('string'),
  instprofile: DS.attr('string'),
  lkinprofile: DS.attr('string'),
  twitprofile: DS.attr('string'),
  youtbprofile: DS.attr('string'),
  otherprofile: DS.attr('string'),
  lattes: DS.attr('string'),
  showBday: DS.attr('boolean', {
     defaultValue: 'true'
  }),
  showGenre: DS.attr('boolean', {
     defaultValue: 'true'
  }),
  aboutMe: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  messengerStatus: DS.attr('string', {
    defaultValue: 'offline'
  }),
  isTalking: DS.attr('string', {
    defaultValue: false
  }),
  unreadMessages: DS.attr('number', {
    defaultValue: null
  })
});