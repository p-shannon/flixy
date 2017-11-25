ALTER TABLE movies ADD COLUMN timestamp BIGINT not null;
DELETE from movies;