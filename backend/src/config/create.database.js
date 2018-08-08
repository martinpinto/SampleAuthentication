const { Pool, Client } = require('pg')
//const fs = require('fs');
//const path = require('path');

if (process.argv.length < 5) {
    usage();
    process.exit(1);
}

// accepts:
// - <database:name> : the name of the database to be created,
// - <user:name> : the name of the user to be created,
// - <user:password> : the password (in clear text) for the user to be created
const databaseName = process.argv[2];
const userName = process.argv[3];
const userPassword = process.argv[4];

//const sqlFile = path.join(__dirname, 'schemas.sql');
//const sqlFileContent = fs.readFileSync(sqlFile).toString();

const connectionString = `postgres://${userName}:${userPassword}@localhost/${databaseName}`;

// create user
const userSql = `CREATE USER ${userName} WITH PASSWORD '${userPassword}' CREATEDB;`;

const client1 = new Client();
client1.connect(function(err, client, done) {
    client1.query(userSql, function(err, result) {
        if (err) {
            console.log('error: ', err);
            process.exit(1);
        }
        console.log(`User '${userName}' created successfully:`, result);
    });
});

const client = new Client({
    connectionString: connectionString,
});
client.connect()

// create database
const createDatabaseSql = `CREATE DATABASE ${databaseName};`
client.query(createDatabaseSql, function(err, result) {
    if (err) {
        console.log('error: ', err);
        process.exit(1);
    }
    console.log(`User '${userName}' created successfully:`, result);
});

// grant privileges
const alterPrivilegesTablesSql = `ALTER DEFAULT PRIVILEGES GRANT ALL ON TABLES TO ${userName};`;
client.query(alterPrivilegesTablesSql, function(err, result) {
    if (err) {
        console.log('error: ', err);
        process.exit(1);
    }
    console.log(`Altered privileges to '${userName}' tables successfully:`, result);
});

// grant privileges
const alterPrivilegesSequencesSql = `ALTER DEFAULT PRIVILEGES GRANT ALL ON SEQUENCES TO ${userName};`;
client.query(alterPrivilegesSequencesSql, function(err, result) {
    if (err) {
        console.log('error: ', err);
        process.exit(1);
    }
    console.log(`Altered privileges to '${userName}' sequences successfully:`, result);
});

// grant privileges
const grantPrivilegesSql = `GRANT ALL PRIVILEGES ON DATABASE ${databaseName} TO ${userName};`;
client.query(grantPrivilegesSql, function(err, result) {
    if (err) {
        console.log('error: ', err);
        process.exit(1);
    }
    console.log(`Granted privileges to '${userName}' successfully:`, result);
    console.log("Database creation success!");
    process.exit(0);
});


function usage() {
    console.log(`Please use this script as follows: node create.database.js <database:url> <user:name> <user:password>,
        where: 
        * <database:name> : the name of the database to be created,
        * <user:name> : the name of the user to be created,
        * <user:password> : the password (in clear text) for the user to be created
    `);
}