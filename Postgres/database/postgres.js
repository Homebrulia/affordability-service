const { Pool } = require('pg');
const pass = require('./postgrespassword.js');

const pool = new Pool({
  user: 'postgres',
  password: pass,
  host: '52.53.208.111',
  database: 'affordability',
  max: 10,
  //max defaults to 10, but putting it here explicitly for later debugging.
  port: 5432,
});

module.exports.pool = pool;