App.AutoExpandingTextAreaComponent = Ember.TextArea.extend({
  keyDown: function (event) {
    if (this._isValidCombination(event)) {
      event.preventDefault();
      this.sendAction('submit');
      var self = this;
      Ember.run.next(function (){
        window.autosize.update(self.$());
      });
    }
  },

  didInsertElement: function (){
    window.autosize(this.$());
  },

  _isCorrectKeyCode: function (keyCode) {
    return keyCode === 13;
  },
  _isValidCombination: function (event) {
    return this._isCorrectKeyCode(event.keyCode);
  }
});