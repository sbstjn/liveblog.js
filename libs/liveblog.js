/*
 * GET home page.
 */
var fs = require('fs')
  , d8local = require('d8/locale/en-US')
  , d8 = require('d8')
  , md = require("node-markdown").Markdown
  , path = require('path')
  , socket = require('./socket');

var CNF = {
  fileRegEx: /^\d{4}\-\d{2}\-\d{2}\T\d{9}$/,
  dateString: 'Y-m-d<T>Hisu'
};
  
var Blog = function(app) {
  this.initialize(app);
};

Blog.prototype.initialize = function(app) {
  this.socket = socket;
  this.posts  = {};
  this.export = [];
  this.files  = fs.readdirSync(app.get('root') + '/posts');
  this.root   = app.get('root');
  
  for (var i = 0; i < this.files.length; i++) {
    if (!this.files[i].match(CNF.fileRegEx)) {
      continue; }
    
    var file = this.root + '/posts/' + this.files[i];
    var data = '' + fs.readFileSync(file);
    
    var fileObj = {file: file, date: Date.toDate(this.files[i], CNF.dateString ), message: md(data)};
    this.posts[file] = fileObj;
    this.export.push(fileObj);
  }
    
  this.export.sort(function(a, b) { return a.date > b.date ? 1 : -1; });  
};

Blog.prototype.recent = function() {
  return this.export;
};

Blog.prototype.handleSocket = function(s) {
  this.socket.add(s);
};

Blog.prototype.post = function(msg) {
  var date  = new Date();
  var file  = this.root + '/posts/' + date.format(CNF.dateString);
  var write = fs.writeFileSync(file, msg);
  var fileObj = {file: file, date: date, message: msg};

  this.posts[file] = fileObj;
  this.export.push(fileObj);
  this.socket.broadcast({date: date, msg: md(msg)});
  this.export.sort(function(a, b) { return a.date > b.date ? 1 : -1; });
};

exports.initialize = function(app) { return new Blog(app); };


