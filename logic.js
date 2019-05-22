var db = require('./db');

// Logic for POST temperatures
module.exports.postTemperatures = (tempData, callback) => {
  'use strict';

  db.postTemperatures(tempData, (err, results) => {
    if(!err) {
      callback(null, results);
    } else {
      callback(err, null);
    }
  });
};

// Login for GET temperatures
module.exports.getTemperatures = (interval, callback) => {
  'use strict';

  // Perform the query, and mutate the results if needed
  db.getTemperatures(interval, (err, results) => {
    if(!err) {
      callback(null, results);
    } else {
      callback(err, null);
    }
  })
}