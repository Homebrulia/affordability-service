CREATE DATABASE affordability

USE affordability

CREATE SCHEMA IF NOT EXISTS mortgage

CREATE TABLE mortgage.agent (
  id GENERATED AS IDENTITY,
  name VARCHAR (50) NOT NULL,
  phone TEXT NOT NULL,
  email VARCHAR (50) NOT NULL,
  rating REAL
)

CREATE TABLE mortgage.home (
  id GENERATED AS IDENTITY,
  name VARCHAR (50) NOT NULL,
  price INT NOT NULL CHECK (price > 0),
  PRIMARY KEY(id)
  CONSTRAINT agent_id,
    FOREIGN KEY(id)
      REFERENCES agent(id)
      ON DELETE CASCADE
)

CREATE TABLE mortage.discounts (
  id GENERATED AS IDENTITY,
  name VARCHAR (50) DEFAULT 'discount',
  price INT NOT NULL CHECK (price > 0),
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
      REFERENCES home(id)
      ON DELETE CASCADE
)
