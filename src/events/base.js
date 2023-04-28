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
      console.log(room)

      //join room
      const ip = socket.client.request.headers['x-forwarded-for'] || socket.client.conn.remoteAddress
      socket.join(room);

      callback({ status: true, msg: "connected join in room : " + room });
      console.log(`connected join on ${room}, socket_id : ${socket.id} ip : ${ip}`);

    })

    socket.on('send-chat', async (data, callback) => {
      const { room, headers, payload } = data
      let appendFormData = new FormData();
      appendFormData.append('recipient_id', payload.recipient_id);
      appendFormData.append('recipient_group_id', payload.recipient_group_id);
      appendFormData.append('consultation_message_id', payload.consultation_message_id);
      appendFormData.append('inquiry_id', payload.inquiry_id);
      appendFormData.append('message', payload.message);
      for (let i = 0; i < Object.keys(payload.attachments).length; i++) {
        appendFormData.append('attachments[]', payload.attachments[i], 'b.json');
      }
      // hit api
      const result = await request(`customer/consultation-chat/store`, 'POST', appendFormData, { headers })
      const status = result?.data?.status
      if (status) {
        io.to(room).emit('receive-msg', { info: `${payload.msg}` });
        callback({ status, data: result?.data, info: { room } });
        console.log('kirim messsage', payload.message)
      } else {
        callback({ status: false, msg: 'send message data failed', info: { api: result.response.data.message } });
        console.log(`[${room}] send message data failed ${JSON.stringify(result)}`)
      }
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
