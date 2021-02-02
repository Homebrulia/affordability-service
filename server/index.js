const relic = require('newrelic');
/* eslint-disable no-console */
const compression = require('compression');
const express = require('express');
// LEGACY CONTROLLER: const mongoCont = require('../controller/mongo.js');
const postgresController = require('../Postgres/controller/postgres.js');
const path = require('path')

const app = express();
const PORT = 8020;

app.use(compression());
app.use(express.json());
app.use('/mortgage/:id', express.static('client/dist'));

app.listen(PORT, () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});

// LEGACY GET:  app.get('*/:id/db', mongoCont.get);
app.get('*/:id/db', postgresController.get);
app.post('/mortgage/db', postgresController.post);
// For load testing
app.get('*/loaderio-e8eeb20f03963c7796eaea1f2714e003.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../loaderio-e8eeb20f03963c7796eaea1f2714e003.txt'))
})