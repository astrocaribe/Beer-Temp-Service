var db = require('./db');

// Logic for POST temperatures
exports.postTemperatures = (tempData, callback) => {
  'use strict';
  db.postTemperatures(tempData, (err, results) => {
    if(!err) {
      callback(null, results);
    } else {
      callback(err, null);
    }
  });
};
