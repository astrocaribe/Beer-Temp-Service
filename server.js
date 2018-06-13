'use strinct';


const express = require('express');
const path = require('path');
const favicon = require('express-favicon');

var parseArgs = require('minimist');
var bodyParser = require('body-parser');

var printer = require('pino-http-print')();
var pinoExpress = require('express-pino-logger')(printer);

// var config = require('./config/config');
var handlers = require('./handlers');

var args = parseArgs(process.argv.slice(1));
var port = args.port || process.env.PORT || 4000;

var app = express();
app.use(bodyParser.json({ type: 'application/json' }));
app.use(favicon(path.resolve(__dirname + '/public/favicon.ico')));
app.use(pinoExpress);

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
