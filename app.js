var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contacts');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Route for '/'
app.get('/', function(req, res) {
  res.render( 'index', {name: "Max", message: 'Welcome to our contacts page! I hope you have a good stay.'});

}); // end for '/' route
