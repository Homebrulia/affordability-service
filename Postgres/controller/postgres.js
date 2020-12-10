const postgresDB = require('../database/postgres.js');

module.exports = {
  get: (req, res) => {
    const query = `SELECT * FROM mortgage.homes WHERE id = ${req.params.id}`;
    postgresDB.pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query(query, (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        result.rows.length > 0 ? res.send({homePrice: result.rows[0].price}) : res.sendStatus(404);
        // res.send({homePrice: result.rows[0].price});
      })
    });
  },
};
