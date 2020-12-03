CREATE DATABASE affordability

USE affordability

CREATE SCHEMA IF NOT EXISTS mortgage

CREATE TABLE mortgage.home_prices (
  id GENERATED AS IDENTITY,
  name VARCHAR (50) NOT NULL,
  price INT NOT NULL CHECK (price > 0),
  PRIMARY KEY(id)
)

CREATE TABLE mortage.discounts (
  id GENERATED AS IDENTITY,
  name VARCHAR (50) DEFAULT 'discount',
  price INT CHECK (price > 0),
  date DATERANGE,
  max_discount_points INT CHECK (max_discount_points >= 0),
  min_down_payment INT CHECK (min_down_payment >= 0),
  min_interest_rate REAL CHECK (min_interest_rate >= 0),
  low_income BOOLEAN DEFAULT FALSE,
  veteran BOOLEAN DEFAULT FALSE,
  combinable BOOLEAN,
  PRIMARY KEY(id)
  CONSTRAINT home_id
    FOREIGN KEY(id)
      REFERENCES home_prices(id)
      ON DELETE CASCADE
)
