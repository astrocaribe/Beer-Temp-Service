'use strict'

var error = require('./helpers/error');
var packageJson = require('./package.json');


// Request handler for ping route
module.exports.pingHandler = function pingHandler(req, res) {
  console.log('[INFO]: ' + req.method + ' ' + req.url + ' starting.');

  // Parse service information from package.json to use in ping message

  var jsonResponse = {};
  jsonResponse.name = packageJson.name;
  jsonResponse.version = packageJson.version;
  jsonResponse.description = packageJson.description;

  res.send(jsonResponse);
  console.log('[INFO]: ' + req.method + ' ' + req.url + ' finished.');
};

// Route that handles incoming temperatures
module.exports.temperatureHandler = function temperatureHandler(req, res) {
  console.log('[INFO]: ' + req.method + ' ' + req.url + ' starting.');

  var body = req.body;
  console.log('Room: ' + body.room + '*F, Outside: ' + body.weather + '*F');

  var jsonResponse = {};
  jsonResponse.message = 'Ok!'
  res.json(jsonResponse);

  console.log('[INFO]: ' + req.method + ' ' + req.url + ' finished.');
};

// Catch all handler for non-provisioned 404s
module.exports.noRouteHandler = function noRouteHandler(req, res) {
  var errorObject = error.generate('routeNotFoundError', req.path + ' Route not found.', 404);

  res.status(404).send(errorObject);
};
