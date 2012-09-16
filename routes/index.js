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
  res.send('export ' + req.param('format'));
};

exports.stream = function(req, res) {
  res.send('stream ' + req.param('format'));  
};

exports.post = function(req, res) {
  req.app.get('blog').post(req.body.value);
  res.send('{"status": "200"}');
};
