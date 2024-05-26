FROM bitnami/postgresql:latest

COPY data.csv /docker-entrypoint-initdb.d/
COPY init.sql /docker-entrypoint-initdb.d/