-- to run whole file: psql -f /Users/timothyakana/Documents/Hack_Reactor/SDC/sdcSeeding/Postgresql/postgresqlSchema.sql;
-- \l  => shows all databases;
-- \dn => show schemas
-- \dt [schema].* => show all tables in schema

CREATE DATABASE affordability;

\connect affordability;

CREATE SCHEMA IF NOT EXISTS mortgage;

CREATE TABLE mortgage.agents (
  id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  phone TEXT NOT NULL,
  email VARCHAR (50) NOT NULL,
  rating REAL
);

CREATE TABLE mortgage.homes (
  id SERIAL,
  name VARCHAR (50) NOT NULL,
  price INT NOT NULL CHECK (price > 0),
  home_owners_association SMALLINT,
  home_insurance SMALLINT,
  property_tax_rate REAL,
  agent_id INT,
  PRIMARY KEY(id),
  CONSTRAINT agent_id
    FOREIGN KEY(agent_id)
      REFERENCES mortgage.agents(id)
      ON DELETE CASCADE
);

CREATE TABLE mortgage.discounts (
  id SERIAL,
  name VARCHAR (50) DEFAULT 'discount',
  price INT NOT NULL CHECK (price > 0),
  start_discount DATE,
  end_discount DATE,
  max_discount_points INT CHECK (max_discount_points >= 0),
  min_down_payment INT CHECK (min_down_payment >= 0),
  min_interest_rate REAL CHECK (min_interest_rate >= 0),
  low_income BOOLEAN DEFAULT FALSE,
  veteran BOOLEAN DEFAULT FALSE,
  combinable BOOLEAN,
  home_id INT,
  PRIMARY KEY(id),
  CONSTRAINT home_id
    FOREIGN KEY(home_id)
      REFERENCES mortgage.homes(id)
      ON DELETE CASCADE
);
