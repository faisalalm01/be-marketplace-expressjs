module.exports = {
  development: {
    username: "muhammadisa",
    password: "muhammadisa",
    database: "marketplace",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "muhammadisa",
    database: "muhammadisa",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOST,
    // "username": 'root',
    // "password": null,
    // "database": 'marketplace',
    // "host": '127.0.0.1',
    dialect: "mysql",
  },
};
