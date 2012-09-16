var listSocket = {};

exports.add = function(socket) {
  listSocket[socket.id] = socket;

  socket.emit('stats', {count: 4, max: 3, min: 2});
};
