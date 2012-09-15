
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { 
    title: 'Express', protocol: req.app.get('protocol'), hostname: req.app.get('hostname'), port: req.app.get('port.socket') });
};
