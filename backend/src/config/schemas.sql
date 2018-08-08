CREATE DATABASE sample_registration;

ALTER DEFAULT PRIVILEGES GRANT ALL ON TABLES TO sample_user;
ALTER DEFAULT PRIVILEGES GRANT ALL ON SEQUENCES TO sample_user;

GRANT ALL PRIVILEGES ON DATABASE sample_registration TO sample_user;

CREATE TABLE RegisteredUser (
    ru_id SERIAL PRIMARY KEY,
    ru_firstname VARCHAR(500) NOT NULL,
    ru_lastname VARCHAR(500) NOT NULL,
    ru_password VARCHAR(500) NOT NULL,
    ru_email VARCHAR(500) UNIQUE NOT NULL
);

GRANT ALL PRIVILEGES ON TABLE RegisteredUser TO sample_user;
GRANT USAGE, SELECT ON SEQUENCE registereduser_ru_id_seq TO sample_user;