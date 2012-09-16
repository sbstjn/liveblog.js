function reverse() {
  var list = $('#ticker ul');
  var listItems = list.children('li');
  list.append(listItems.get().reverse());
}

require(["jquery", "console"], function($, TickerConsole) {
  var hash = window.location.hash.substring(1);
  var mode = 'ASC';

  // Add default ASC sorting
  if (hash == '' || hash == null) {
    location.replace('/#asc'); }
  // Check for sorting by URL
  if (hash == 'desc') {
    mode = 'DESC'; } 
  else {
    mode = 'ASC'; }

  // Start
  $(document).ready(function(e) {
    // Reverse items if sorting DESC
    $('#sorting .' + mode.toLowerCase()).addClass('active'); 
    if (mode == 'DESC') {
      reverse(); }
    
    // Initialize Console and Socket.IO
    var myCon   = new TickerConsole('#console');
    var socket  = io.connect(socketConfig.protocol + '://' + socketConfig.host + ':' + socketConfig.port);
    
    // Add events for debug loggin
    socket.on('connect', function() {
      myCon.add('Connected to Socket!');
    });
    
    // Received stats
    socket.on('stats', function(data) {
      myCon.add('Received Stats: ' + JSON.stringify(data));
    });
    
    // Add events to switch sorting
    $('#sorting a').click(function(e) {
      $('#sorting li').removeClass('active');
      $(this).parent().addClass('active');
      
      reverse();
    }); 
  });
});
