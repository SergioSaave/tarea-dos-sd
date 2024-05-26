CREATE DATABASE tarea2;

\c tarea2

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    title TEXT,
    price DECIMAL(10, 2)
);

COPY productos (title, price)
FROM '/docker-entrypoint-initdb.d/data.csv'
DELIMITER ','
CSV HEADER;

-- COPY productos (title, price) FROM '/docker-entrypoint-initdb.d/data.csv' DELIMITER ',' CSV HEADER;