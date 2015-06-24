var config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(config.mongo.dbUrl);

var mongojs = require('mongojs');
var db = mongojs(config.mongo.dbUrl, ['contacts']);

var async = require('async');
var Contact = require('../lib/contacts.js');

describe('basic functions', function() {
  beforeEach(function(jasmine_done) {
    Contact.remove({
      firstName: 'Marmaduke',
      lastName: 'the Dog',
      title: 'House Pet'
    }, jasmine_done);
  });

  it('creates a contact and stores it in the database', function(jasmine_done) {

    async.series([

        // create the contact
        function(done) {
          Contact.create({
            firstName: 'Marmaduke',
            lastName: 'the Dog',
            title: 'House Pet'
          }, function(err, dog) {
            done(err, dog);
          });
        },

        // check the database
        function(done) {
          db.contacts.find({
            firstName: 'Marmaduke',
            lastName: 'the Dog',
            title: 'House Pet'
          }).count(function(err, count) {
            expect(count).toBe(1);
            done();
          });
        }
      ],

      function() {
        jasmine_done();
      });
  });

  it('will not allow contacts without first name', function(jasmine_done) {

    async.series([

        // create the contact
        function(done) {
          Contact.create({
            lastName: 'Cher',
            title: 'Diva'
          }, function(err, cher) {
            done(err, cher);
          });
        },

        // check the database
        function(done) {
          db.contacts.find({
            lastName: 'Cher',
            title: 'Diva'
          }).count(function(err, count) {
            expect(count).toBe(0);
            done();
          });
        }
      ],

      function() {
        jasmine_done();
      });
  });

  it('correctly constructs fullName', function(jasmine_done) {
    Contact.create({
      firstName: 'Marmaduke',
      lastName: 'the Dog',
      title: 'House Pet'
    }, function(err, dog) {
      expect(dog.fullName).toBe('Marmaduke the Dog');
      jasmine_done();
    });
  });
});
