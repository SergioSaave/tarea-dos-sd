# FROM bitnami/postgresql:latest

# COPY data.csv /docker-entrypoint-initdb.d/
# COPY init.sql /docker-entrypoint-initdb.d/
FROM bitnami/postgresql:14.2.0

# Instalar unzip
USER root
RUN apt-get update && apt-get install -y unzip

# Copiar el archivo ZIP y el script SQL
COPY data.csv.zip /docker-entrypoint-initdb.d/

# Descomprimir el archivo ZIP
RUN unzip /docker-entrypoint-initdb.d/data.csv.zip -d /docker-entrypoint-initdb.d/

COPY init.sql /docker-entrypoint-initdb.d/

USER 1001
