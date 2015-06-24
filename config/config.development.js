var config = require('./config.defaults.js');

config.env = 'development';

console.log("we are in development mode");

var secretKeys = {};

try {
  var secretKeys = require('./secrets.json');
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
}

// for each key we're looking for
config.secrets.keys.forEach(function(keyName) {
  if (process.env[keyName]) {
    // if it's available in an environment variable, use that.
    config.secrets[keyName] = process.env[keyName];
  } else if (secretKeys[keyName]) {
    // otherwise, look in our secret key file
    config.secrets[keyName] = secretKeys[keyName];
  } else {
    // we can't find a value for that key - warn someone
    console.warn("Secret for key %s not found", keyName);
  }
})

module.exports = config;
