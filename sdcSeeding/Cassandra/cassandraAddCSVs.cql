COPY affordability.base_home_prices (home_id,name,price)
FROM '/Users/timothyakana/Documents/Hack_Reactor/SDC/sdcSeeding/Cassandra/cassandraCSVs/base_home_prices.csv'
WITH DELIMITER=','
AND HEADER=TRUE;

COPY affordability.home_details (home_id,home_name,price,home_owners_association,home_insurance,property_tax_rate,agent_id)
FROM '/Users/timothyakana/Documents/Hack_Reactor/SDC/sdcSeeding/Cassandra/cassandraCSVs/home_details.csv'
WITH DELIMITER=','
AND HEADER=TRUE;

COPY affordability.home_discounts (discount_id,home_id,home_name,home_price,discount_name,discount_price,start,end,max_discount_points,min_down_payment,min_interest_rate,low_income,veteran,combinable)
FROM '/Users/timothyakana/Documents/Hack_Reactor/SDC/sdcSeeding/Cassandra/cassandraCSVs/home_discounts.csv'
WITH DELIMITER=','
AND HEADER=TRUE;

COPY affordability.agent_listings (agent_id,home_id,home_name,agent_name,agent_phone,agent_email,agent_rating)
FROM '/Users/timothyakana/Documents/Hack_Reactor/SDC/sdcSeeding/Cassandra/cassandraCSVs/agent_listings.csv'
WITH DELIMITER=','
AND HEADER=TRUE;
