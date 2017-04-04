'use strinct';

var express = require('express');
var parseArgs = require('minimist');
var bodyParser = require('body-parser');

// var config = require('./config/config');
var handlers = require('./handlers');

var args = parseArgs(process.argv.slice(1));
var port = args.port || 4000;

var app = express();
app.use(bodyParser.json({ type: 'application/json' }));

/* **************** ROUTES **************** */
app.get('/ping', handlers.pingHandler);
app.post('/temperatures', handlers.temperatureHandler);
app.get('*', handlers.noRouteHandler);
/* **************** ROUTES **************** */

// HTTP server
app.listen(port, function() {
  console.log('Node server listening on port ' + port);
});

module.exports = app;
