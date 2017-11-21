DROP TABLE users;
CREATE TABLE IF not exists users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  firstname VARCHAR(255),
  lastname VARCHAR(255)
);

ALTER TABLE movies ADD COLUMN user_id INTEGER REFERENCES users(id);
ALTER TABLE comments ADD COLUMN user_id INTEGER REFERENCES users(id);
