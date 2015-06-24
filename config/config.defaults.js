var config = {};

config.env = 'defaults';

// defaults for mongo behavior

config.mongo = {};
config.mongo.dbUrl = 'mongodb://localhost/contacts';

// defaults for web addresses and ports

config.web = {};
config.web.hostname = 'localhost';
config.web.serverPort = 3000;
config.web.cookieOptions = {};

// defaults for authentication strategy

config.auth = {};
config.auth.strategy = 'local';
config.auth.callbackURL = '';

// where we keep our secrets

config.secrets = {};
config.secrets.keys = [
  'GITHUB_CLIENT_SECRET',
  'GITHUB_CLIENT_ID',
  'SESSION_KEY'
];

module.exports = config;
