/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', {
    posts: req.app.get('blog').recent(),
    protocol: req.app.get('protocol'), 
    hostname: req.app.get('hostname'), 
    port: req.app.get('port.socket') 
  });
};

exports.export = function(req, res) {
  switch (req.param('format')) {
    case 'json':
      res.send((req.app.get('blog').recent()));
      break;
    case 'xml':
      res.send('MLX');
      break;
    default:
      res.send('unknown format');
      break;
  }
  // res.send('export ' + req.param('format'));
};

exports.stream = function(req, res) {
  res.send('stream ' + req.param('format'));  
};

exports.post = function(req, res) {
  req.app.get('blog').post(req.body.value);
  res.send('{"status": "200"}');
};
