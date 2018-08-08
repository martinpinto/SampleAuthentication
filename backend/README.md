# Sample Registration and Login - Backend

This folder contains all the relevant code implementing the backend for the sample registration and login application.
Please follow the following steps in order to set up the repository.

## Setup the project and install dependencies

In order to install all dependencies, open a console and type:

```
npm install
```

*NOTE*: In order to enable logging to file, a folder `\logs` has to be created at root level of this project. Next a file `app.log` has to be created as well.

## Generate Database schema and create database user

In order to generate the database schemata, the database schema can be created by hand using the PostgreSQL console. Open the PostgreSQL console and type e.g.:

```
CREATE DATABASE sample_registration;

CREATE USER sample_user WITH PASSWORD 'change_me123!' CREATEDB;

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
```

You can of course define your own database name and user name with password.

## Configure application settings

After setting up the database schemata, the application has to be configured. The backend comes with a config file in toml format for this purpose. This file can be found under ```src\config\server.toml```.

Under ```[database]``` the following attributes can be used to configure the database:

* ```baseurl``` : the location of the database, e.g. "localhost"
* ```protocol``` : the protocol to connect to the database, e.g. "http://"
* ```port``` : the port of the database, e.g. "5432"
* ```database``` : the name of the database, e.g. "sample_registration"
* ```user``` : the name of the user registered for the database, e.g. "sample_user"
* ```password``` : the password of the user registered for the database, e.g. "change_me123!"

These settings must be changed in order to get the server running.

## Compile and hot-reload for development

In order to compile and get the server running on developer mode, open a console and type:

```
npm run dev
```
