/* eslint-disable global-require */
const express = require('express');
const path = require('path');

require('dotenv').config();

const port = process.env.APP_PORT || 2001;
const app = express();

let { http, server, https } = ['', '', '']
const fs = require('fs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

if (process.env.APP_ENV === 'development') {
  http = require('http');
  server = http.createServer(app);
} else {
  https = require('https');

  const https_key = process.env.HTTPS_KEY_PATH;
  const https_cert = process.env.HTTPS_CERT_PATH;

  const privateKey = fs.readFileSync(https_key, 'utf8');
  const certificate = fs.readFileSync(https_cert, 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
}

const io = require('socket.io')(server),
  base = require('./events/base')(io)

const routes = require('./routes/index');

app.use('/', routes);

server.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
});
