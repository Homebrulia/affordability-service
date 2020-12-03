CREATE KEYSPACE  IF NOT EXISTS affordability
WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor': 1}

USE affordability

CREATE TABLE IF NOT EXISTS home_prices (
  id INT,
  name VARCHAR,
  price INT,
  PRIMARY KEY (id, price)
)

CREATE TABLE IF NOT EXISTS home_discounts (
  id INT,
  home_name VARCHAR,
  base_price INT,
  discount_name VARCHAR,
  discount_price INT,
  start DATE,
  end DATE,
  max_discount_points SMALLINT,
  min_down_payment INT,
  min_interest_rate FLOAT,
  low_income BOOLEAN,
  veteran BOOLEAN,
  combinable BOOLEAN,
  PRIMARY KEY (id, home_name, base_price, discount_name, (start, end))
) WITH caching = {'keys': 'ALL', 'rows_per_partition': 20}
