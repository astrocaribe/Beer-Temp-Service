var error = require('./helpers/error');
var packageJson = require('./package.json');
var logic = require('./logic');


// Request handler for ping route
module.exports.pingHandler = function pingHandler(req, res) {
  'use strict';

  // Parse service information from package.json to use in ping message

  var jsonResponse = {};
  jsonResponse.name = packageJson.name;
  jsonResponse.version = packageJson.version;
  jsonResponse.description = packageJson.description;

  res.send(jsonResponse);
};

// Route that handles incoming temperatures
module.exports.temperatureHandler = function temperatureHandler(req, res) {
  'use strict';
  // console.log('[INFO]: ' + req.method + ' ' + req.url + ' starting.');

  var body = req.body;
  logic.postTemperatures(body, function(err, results) {
    if(!err) {
      var jsonResponse = {};
      jsonResponse.message = 'Ok!';
      jsonResponse.payload = results;
      res.json(jsonResponse);

      res.status(201);
    } else {
      req.log.error("Error: ", err);
    }
  });

  // console.log('Room: ' + body.room + '*F, Outside: ' + body.weather + '*F');
};

// Catch all handler for non-provisioned 404s
module.exports.noRouteHandler = function noRouteHandler(req, res) {
  'use strict';
  var errorObject = error.generate('routeNotFoundError', req.path + ' Route not found.', 404);

  res.status(404).send(errorObject);
};
