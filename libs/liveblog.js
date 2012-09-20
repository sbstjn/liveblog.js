var fs = require('fs')
  , d8local = require('d8/locale/en-US')
  , d8 = require('d8')
  , md = require("node-markdown").Markdown
  , path = require('path');

var CNF = {
  fileRegEx: /^\d{4}\-\d{2}\-\d{2}\T\d{9}$/,
  dateString: 'Y-m-d<T>Hisu'
};
  
var Blog = function(app) {
  this.initialize(app);
};

Blog.prototype.initialize = function(app) {
  this.app    = app;
  this.socket = require('./socket');
  this.posts  = {};
  this.export = [];
  this.files  = fs.readdirSync(app.get('root') + '/posts');
  this.root   = app.get('root');

  this.loadUsers();
  
  for (var i = 0; i < this.files.length; i++) {
    if (!this.files[i].match(CNF.fileRegEx)) {
      continue; }
    
    var file = this.root + '/posts/' + this.files[i]
      , data = fs.readFileSync(file) + ''
      , fileObj = {file: file, date: Date.toDate(this.files[i], CNF.dateString ), message: md(data), raw: data};
    
    this.posts[file] = fileObj;
    this.export.push(fileObj);
  }
  
  this.export.sort(function(a, b) { return a.date > b.date ? 1 : -1; });  
};

Blog.prototype.checkAuth = function(username, password, callback) {
  callback(this.user[username] && this.user[username] == password);
};

Blog.prototype.loadUsers = function() {
  var data = (fs.readFileSync(this.app.get('root') + '/users') + '').split("\n");
  
  this.user = {};
  for (var i = 0; i < data.length; i++) {
    var tmp = data[i].split(':');
    this.user[tmp[0]] = tmp[1];
  }
};

Blog.prototype.recent = function() {
  return this.export;
};

Blog.prototype.handleSocket = function(s) {
  this.socket.add(s);
};

Blog.prototype.post = function(msg) {
  if (msg == '') {
    return; }
  
  var date = new Date()
    , file = this.root + '/posts/' + date.format(CNF.dateString)
    , write = fs.writeFileSync(file, msg)
    , fileObj = {file: file, date: date, message: md(msg), raw: msg};
  
  this.posts[file] = fileObj;
  this.export.push(fileObj);
  this.socket.broadcast({date: date, message: md(msg), raw: msg});
  this.export.sort(function(a, b) { return a.date > b.date ? 1 : -1; });
};

exports.initialize = function(app) { return new Blog(app); };
