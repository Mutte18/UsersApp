DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER IDENTITY,
  provider_id VARCHAR(20),
  provider_name VARCHAR(100),
  payment_amount DECIMAL,
  payer_id VARCHAR(20),
  payer_name VARCHAR(100)
)
