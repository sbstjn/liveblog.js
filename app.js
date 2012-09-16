
/**
 * Module dependencies.
 */

var express = require('express')
  , socket = require('socket.io')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , blog = require('./libs/liveblog');
var app = express();

app.configure(function() {
  app.set('protocol', 'http');
  app.set('hostname', 'localhost');
  app.set('root', __dirname);
  app.set('port', process.env.PORT || 3000);
  app.set('port.socket', process.env.PORT_SOCKET || process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('blog', blog.initialize(app));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/export.:format', routes.export);
app.get('/stream.:format', routes.stream);

app.post('/post', routes.post);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

if (process.env.PORT_SOCKET) {
  var io = socket.listen(process.env.PORT_SOCKET * 1);
} else {
  var io = socket.listen(server);
}

io.sockets.on('connection', function(socket) { 
  app.get('blog').handleSocket(socket); 
});

