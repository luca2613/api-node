const mysql = require('mysql');

const config = require('./config.js');

var pool = mysql.createPool({
    "user" : config.DB_USER,
    "password" : config.DB_PASSWORD,
    "database" : config.DB_NAME,
    "host" : config.DB_HOST,
    "port" : config.DB_PORT
});

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    })
}

exports.pool = pool;