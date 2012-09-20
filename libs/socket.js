var listSocket = {};

exports.add = function(socket) {
  listSocket[socket.id] = socket;
};

exports.broadcast = function(data) {
  for (var n in listSocket) {
    listSocket[n].emit('data', data);
  }
};
