define(['jquery'], function ($) {
  var consoleObj = function(selector) {
    this.selector = {
      list: selector + ' ul'
    };
    
    this.add('Finished loading assets!')
    this.add('Initializing…');
  }

  consoleObj.prototype.add = function(msg) {
    $(this.selector.list).append('<li>' + msg + '</li>');
  };
  
  return consoleObj;
});
