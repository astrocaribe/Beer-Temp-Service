/* jshint node: true */
'use strict';

var sqlite = require('sqlite3').verbose();
var fs = require('fs');

var file = './resources/db/temperatures.db';

// Keep this in case there is need to dynamically create a db based on the date.
// This will be useful for recording the beginning of the brewing campaign.
// var date = new Date();
// var db_name = String(date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + ".db");
// var file = './resources/db/beer_temp_' + db_name;

exports.postTemperatures = function postTemperatures( tempData, callback ) {
  // Ensure database file exists
  var exists = fs.existsSync(file);
  var db = new sqlite.Database(file);

  db.serialize(function( err, result ){
    if(!exists) {
      db.run("CREATE TABLE beer_temp ( `id` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, `room` REAL, `external` REAL, `time` TEXT )");
      if (err) {
        callback(err, null);
      }
    }

    // tempData is in UTC from the monitoring service
    var stmt = db.prepare("INSERT INTO beer_temp (room, external, time) VALUES (?, ?, ?)");
    stmt.run(tempData.room, tempData.weather, tempData.time);
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }

    stmt.finalize();

  });

db.close();
};
