var config = require('./config.defaults.js');
var util = require('util');

console.log('we are in PRODUCTION mode');

config.mongo.dbUrl = 'mongodb://localhost/contacts';

https: //fierce-earth-4655.herokuapp.com/
config.web.hostname = 'fierce-earth-4655.herokuapp.com';
config.web.serverPort = 3000;


// for each key we're looking for
config.secrets.keys.forEach(function(keyName) {
  if (process.env[keyName]) {
    // if it's available in an environment variable, use that.
    config.secrets[keyName] = process.env[keyName];
  } else {
    // we can't find a value for that key - warn someone
    throw new Error(util.format('Secret for key %s not found', keyName));
  }
});

module.exports = config;
