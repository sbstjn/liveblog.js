var listSocket = {};

exports.add = function(socket) {
  listSocket[socket.id] = socket;

  // Socket tests
  // socket.emit('stats', {count: 4, max: 3, min: 2});
};

exports.broadcast = function(data) {
  for (var n in listSocket) {
    listSocket[n].emit('data', data);
  }
};
