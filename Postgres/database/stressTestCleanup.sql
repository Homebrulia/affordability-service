-- to run whole file: psql -f /Users/timothyakana/Documents/Hack_Reactor/SDC/Postgres/database/stressTestCleanup.sql;

\connect affordability;

-- Cleans up any data entries from stress-testing POST requests
DELETE FROM mortgage.homes WHERE id > 10000000;