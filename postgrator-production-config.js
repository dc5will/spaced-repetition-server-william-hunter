<<<<<<< HEAD
'use strict';

require('dotenv').config();

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'host': process.env.PROD_MIGRATION_DB_HOST,
  'port': process.env.PROD_MIGRATION_DB_PORT,
  'database': process.env.PROD_MIGRATION_DB_NAME,
  'username': process.env.PROD_MIGRATION_DB_USER,
  'password': process.env.PROD_MIGRATION_DB_PASS,
  'ssl': true
}; 
=======
require('dotenv').config();

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "host": process.env.PROD_MIGRATION_DB_HOST,
  "port": process.env.PROD_MIGRATION_DB_PORT,
  "database": process.env.PROD_MIGRATION_DB_NAME,
  "username": process.env.PROD_MIGRATION_DB_USER,
  "password": process.env.PROD_MIGRATION_DB_PASS,
  "ssl": true
}
>>>>>>> 70ec6f706a4aa40032d020002a59a2475d3f1bda
