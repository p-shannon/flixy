CREATE TABLE IF not exists comments (
	id SERIAL PRIMARY KEY,
	body TEXT NOT NULL,
	timestamp BIGINT NOT NULL,
	movie_id INTEGER REFERENCES movies(id)
);

