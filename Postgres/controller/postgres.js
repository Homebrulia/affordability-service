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
          res.sendStatus(404);
          return console.error('Error executing query', err.stack)
        } else {
          result.rows.length > 0 ? res.send({homePrice: result.rows[0].price}) : res.sendStatus(404);
        }
      })
    });
  },
  //TODO: set up a post route for stress-testing
  post: (req, res) => {
    const { name, price, home_owners_association, home_insurance, property_tax_rate, agent_id } = req.body;
    const text = 'INSERT INTO mortgage.homes (name, price, home_owners_association, home_insurance, property_tax_rate, agent_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
    const values = [name, price, home_owners_association, home_insurance, property_tax_rate, agent_id];
    postgresDB.pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query(text, values, (err, result) => {
        release()
        if (err) {
          res.sendStatus(400);
          return console.error('Error executing query', err.stack)
        } else {
          res.sendStatus(201);
        }
      });
    });
  }
};
