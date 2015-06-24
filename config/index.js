// Heroku sets an environment variable
//   NODE_ENV='production'

var env = process.env.NODE_ENV || 'development';
// env is 'production' on Heroku or 'development' locally

var configFileName = './config.' + env + '.js';
// filename:  config.development.js or config.production.js

var config = require(configFileName);

module.exports = config;
