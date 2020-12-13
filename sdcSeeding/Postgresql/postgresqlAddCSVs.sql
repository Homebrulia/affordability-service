-- to run whole file: psql -f /Users/timothyakana/Documents/Hack_Reactor/SDC/sdcSeeding/Postgresql/postgresqlAddCSVs.sql;
\connect affordability;

COPY mortgage.agents
FROM '/Users/timothyakana/Documents/Hack_Reactor/SDC/sdcSeeding/postgresCSVs/agents.csv'
DELIMITER ',' CSV HEADER;

COPY mortgage.homes
FROM '/Users/timothyakana/Documents/Hack_Reactor/SDC/sdcSeeding/postgresCSVs/home_prices.csv'
DELIMITER ','
NULL AS 'null'
CSV HEADER;

COPY mortgage.discounts
FROM '/Users/timothyakana/Documents/Hack_Reactor/SDC/sdcSeeding/postgresCSVs/discounts.csv'
NULL AS 'null'
DELIMITER ',' CSV HEADER;
