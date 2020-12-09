CREATE KEYSPACE  IF NOT EXISTS affordability
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE affordability;

CREATE TABLE IF NOT EXISTS base_home_prices (
  home_id INT,
  name VARCHAR,
  price INT,
  PRIMARY KEY ((home_id), price)
);

CREATE TABLE IF NOT EXISTS home_details (
  home_id INT,
  home_name VARCHAR,
  price INT,
  home_owners_association BOOLEAN,
  home_insurance INT,
  property_tax_rate FLOAT,
  agent_id INT,
  PRIMARY KEY ((home_id), price)
);

CREATE TABLE IF NOT EXISTS home_discounts (
  discount_id INT,
  home_id INT,
  home_name VARCHAR,
  home_price INT,
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
  PRIMARY KEY ((discount_id), home_id)
) WITH caching = {'keys': 'ALL', 'rows_per_partition': 20};

CREATE TABLE IF NOT EXISTS agent_listings (
  agent_id INT,
  home_id INT,
  home_name VARCHAR,
  agent_name VARCHAR,
  agent_phone TEXT,
  agent_email TEXT,
  agent_rating FLOAT,
  PRIMARY KEY ((agent_id), home_id)
);
