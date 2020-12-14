const relic = require('newrelic');
/* eslint-disable no-console */
const express = require('express');
// LEGACY CONTROLLER: const mongoCont = require('../controller/mongo.js');
const postgresController = require('../Postgres/controller/postgres.js');
// const path = require('path')

const app = express();
const PORT = 8020;

app.use(express.json());
app.use('/mortgage/:id', express.static('client/dist'));

app.listen(PORT, () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});

// LEGACY GET:  app.get('*/:id/db', mongoCont.get);
app.get('*/:id/db', postgresController.get);
app.post('/mortgage/db', postgresController.post);
