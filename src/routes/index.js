const express = require('express');

const router = express.Router();

require('dotenv').config();

const port = process.env.APP_PORT;
const app_host = process.env.APP_HOST;
const app_name = process.env.APP_NAME;

router.get('/', async (req, res) => {
  res.render('index', { title: app_name, app_host, port });
});

module.exports = router;
