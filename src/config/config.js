require('dotenv').config();
module.exports = {
  "development": {
    username: "root",
    password: "",
    database: "marketplace",
    host: "127.0.0.1",
    // "username": process.env.DB_USERNAME,
    // "password": process.env.DB_PASSWORD,
    // "database": process.env.DB_DBNAME,
    // "host": process.env.DB_HOST,
    "dialect": "mysql",
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "marketplace",
    "host": "127.0.0.1",
    "dialect": "mysql",
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DBNAME,
    "host": process.env.DB_HOST,
    // "username": 'root',
    // "password": null,
    // "database": 'marketplace',
    // "host": '127.0.0.1',
    "dialect": "mysql",
  },
};
