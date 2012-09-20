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
    // Add events to Post and Clear
    $('button#clear').click(function(e) {
      e.preventDefault();
      $('#post-content').empty();
    });

    $('button#submit').click(function(e) {
      e.preventDefault();
      
      $('#post-action .info').css('display', 'none');
      $('#post-action .loading').css('display', 'block');

      $.post("/post", $("form#post").serialize(), function(data) {
        $('textarea#post-content').val('').change();
        $('#post-action .loading').css('display', 'none');
        $('#post-action .info').css('display', 'block');
      });
    });

    $('button#login').click(function(e) {
      e.preventDefault();

      $.post('/auth', {username: $('#username').val(), password: md5($('#password').val())}, function(data) {
        console.log(data);
      });
    });

    $('textarea#post-content').keyup(function() {
      $('textarea#post-content').change();
    })
    
    $('textarea#post-content').change(function() {
      $('#post-action .info').html($('textarea#post-content').val().length);
    });

    $('textarea#post-content').change();
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

    socket.on('data', function(data) {
      myCon.add('Received Data: ' + JSON.stringify(data));
      
      $('#lastmessage').html((new Date()).format('H:i:s'));
      $('#ticker ul').append('<li class="well"><p>' + data.msg + '</p><small>' + new Date(data.date) + '</small>');
    });
    
    // Add events to switch sorting
    $('#sorting a').click(function(e) {
      $('#sorting li').removeClass('active');
      $(this).parent().addClass('active');
      
      reverse();
    }); 
  });
});
