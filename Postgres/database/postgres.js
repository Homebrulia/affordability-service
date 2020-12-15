const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'ec2-18-144-172-53.us-west-1.compute.amazonaws.com',
  database: 'affordability',
  max: 10,
  //max defaults to 10, but putting it here explicitly for later debugging.
  port: 5432,
});

module.exports.pool = pool;