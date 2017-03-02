'use strict';

module.exports.generate = function(name, message, status, log) {

  var err = new Error();

  err.name = name;
  err.message = message;
  err.status = status;

  return err;
};
