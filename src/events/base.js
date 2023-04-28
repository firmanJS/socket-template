const { count } = require('node:console');
const querystring = require('node:querystring');
const { writeLog, request } = require('../helper');
var FormData = require('form-data');

exports = module.exports = function (io) {
  io.sockets.on('connection', (socket, callback) => {
    // hitung total user tekoneksi
    const total = io.engine.clientsCount;
    console.log(`Total user connected: ${total}`);

    socket.on('join', async (data, callback) => {
      const { room } = data
      //join room
      const ip = socket.client.request.headers['x-forwarded-for'] || socket.client.conn.remoteAddress
      callback({ status: true, msg: "connected join in room : " + room });
      console.log(`connected join on ${room}, socket_id : ${socket.id} ip : ${ip}`);

    })

    socket.on('send-chat', async (data, callback) => {
      const { room, headers, payload } = data
      io.emit('receive-msg', { data, room });
      callback({ data: data, info: { room } });
      console.log('kirim messsage', data, room)
    })
    
    // putuskan koneksi
    socket.on('disconnect', () => {
      socket.in(socket.id).disconnectSockets();
      console.log(`disconnected : ${socket.id}`);
    })

    socket.on('error', function (err) {
      writeLog(err);
      console.log(err);
    });

  })
}
