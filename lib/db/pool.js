const mariadb = require('mariadb');

// Update this with actual production values.
// DO NOT COMMIT PRODUCTION SECRETS TO GIT
const pool = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: '',
    connectionLimit: 5,
    database: process.env.DB_NAME
});

module.exports = {
    getConnection() {
      return new Promise(function (res, rej) {
        pool.getConnection()
          .then(function (conn) {
            res(conn);
          })
          .catch(function (error) {
            rej(error);
          });
      });
    }
  };