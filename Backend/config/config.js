// config/config.js
module.exports = {
    database: {
      url: 'http://Iconic_Veda:CouchDB@localhost:5984',
      dbName: 'employee-form',
    },
    rateLimit: {
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 2, // limit each IP to 2 requests per windowMs
      message: "Number of requests exceeded, try again later",
    },
    server: {
      port: 5000,
    },
  };
  