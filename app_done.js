var config = require('./config');
// we import mongoose and connect it to our db
var mongoose = require('mongoose');
mongoose.connect(config.mongo.dbUrl);
// we import express and create a new instance of express
var express = require('express');
var app = express();
// we import the body-parser module and create an instance of jsonParser middlewear
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
// we import jade and js
var jade = require('jade');
var fs = require('fs');
var stylus = require('stylus');
var nib = require('nib');
// we import our contact model
var Contact = require('./lib/contacts.js');

var util = require('util');

// we set our view engine here
app.set('view engine', 'jade');
app.set('views', './done_templates');

// creates a compile function that calls the stylus and nib middlewear in our stack
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
};

// we set up express to use our stylus middlewear and pass in our compile function as an object here
app.use(stylus.middleware({
  src: __dirname + '/public_done',
  compile: compile
}));
app.use(express.static(__dirname + '/public_done'));

// THIS IS OUR API
// =================================================

// we create a seperate router for our API
var apiRouter = express.Router();

apiRouter.get('/contacts/:id', function(req, res) {
  Contact.find({
    _id: req.params.id
  }, function(error, contact) {
    res.json(contact);
  });
});

apiRouter.get('/', function(req, res) {
  res.json({
    name: 'Hello World!'
  });
});

apiRouter.put('/contacts/:id', jsonParser);
apiRouter.put('/contacts/:id', function(req, res) {
  Contact.findByIdAndUpdate(req.params.id, req.body, function(error, contact) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    };
  });
});

apiRouter.get('/contacts', function(req, res) {
  Contact.find({}, function(error, contactList) {
    res.json(contactList);
    res.status(200);
  });
});

apiRouter.patch('/contacts/:id', jsonParser);
apiRouter.patch('/contacts/:id', function(req, res) {
  Contact.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, function(error, contact) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

apiRouter.delete('/contacts/:id', function(req, res) {
  Contact.remove({
    _id: req.params.id
  }, function(error) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

// we mount out api router on our app
app.use('/api', apiRouter);

// THIS IS OUR CLIENTSIDE INTERFACE
// =================================================
app.get('/', function(req, res) {
  res.render('index', {
    name: "Max",
    message: 'Welcome to our contacts page! I hope you have a good stay.'
  });
});

app.get('/contacts', function(req, res) {
  Contact.find({}, function(error, contactList) {
    res.render('contacts', {
      contacts: contactList
    });
  });
});


app.post('/contacts', jsonParser);
app.post('/contacts', function(req, res) {
  Contact.create(req.body, function(error, contact) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      fs.readFile('./done_templates/contact.jade', 'utf8', function(err, data) {
        if (err) {
          res.sendStatus(400);
        };
        var contactCompiler = jade.compile(data);
        var html = contactCompiler(contact);
        res.json(html);
        res.status(201);
      });
    };
  });
});

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
