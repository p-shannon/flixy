CREATE TABLE IF not exists movies (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	year INTEGER NOT NULL,
	poster VARCHAR NOT NULL,
	director VARCHAR NOT NULL,
	genre VARCHAR NOT NULL,
	runtime VARCHAR NOT NULL,
	rated VARCHAR NOT NULL,
	plot TEXT,
	ratings VARCHAR NOT NULL
);

CREATE TABLE IF not exists users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  firstname VARCHAR(255),
  lastname VARCHAR(255)
);
