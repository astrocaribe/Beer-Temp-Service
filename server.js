'use strinct';

const express = require('express');
const path = require('path');
const favicon = require('express-favicon');

// var parseArgs = require('minimist');
var bodyParser = require('body-parser');

var printer = require('pino-http-print')();
var pinoExpress = require('express-pino-logger')(printer);

// As ooposed to using a config file, configure DB directly from
// environment (Heroku doesn't make it simple to use config from
// version control)
// var config = require('./config/config');
// console.log('Config: ', config.db.uri);

var port = process.env.PORT || 4000;

var handlers = require('./handlers');

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
