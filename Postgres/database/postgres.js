const { Pool } = require('pg');
const pass = require('./postgrespassword.js');

const pool = new Pool({
  user: 'postgres',
  password: pass,
  host: '54.153.85.98',
  database: 'affordability',
  max: 50,
  //max defaults to 10, but putting it here explicitly for later debugging.
  port: 5432,
});

module.exports.pool = pool;
