/* jshint node: true */
'use strict';

const { Pool } = require('pg');
const connStr = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connStr,
});

// Store queries elsewhere, and refer to them here when needed
const currentTimeQuery = `SELECT NOW() as now;`

const createTableQuery = `CREATE TABLE IF NOT EXISTS temperatures (
                          id              SERIAL PRIMARY KEY,
                          temp_room       real NOT NULL,
                          temp_ext        real NOT NULL,
                          ts              timestamp);`

const addTempQuery = `INSERT INTO temperatures(temp_room, temp_ext, ts)
                      VALUES ($1, $2, $3);`

const retrieveTemps = `SELECT temp_room, temp_ext, ts FROM temperatures
                       WHERE ts > NOW() - INTERVAL '1 minutes'*$1;`

pool.query(currentTimeQuery)
      .then(res => console.log(res.rows[0]))
      .catch(e => console.error(e.stack));

pool.query(createTableQuery)
      .then(res => console.log("Table present or created."))
      .catch(e => console.error(e.stack));

exports.postTemperatures = function postTemperatures( tempData, callback ) {
  pool.connect()
  .then(client => {
    return client.query(addTempQuery, [tempData.room, tempData.weather, new Date()])
      .then(res => {
        client.release()
        callback(null, tempData)
      })
      .catch(e => {
        console.log("Failure", e.stack)
        client.release()
        callback(e.stack, null)
      })
  })
};

exports.getTemperatures = function getTemperatures( interval, callback ) {
  pool.connect()
  .then(client => {
    return client.query(retrieveTemps, [interval])
    .then(res => {
      client.release();
      callback(null, res.rows);
    })
    .catch(e => {
      console.log('Failure', e.stack);
      client.release();
      callback(e.stack, null);
    })
  })
};
