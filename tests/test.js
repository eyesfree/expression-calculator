'use strict';

const supertest = require('supertest'); 
const test = require('unit.js');
const app = require('../app.js');

const request = supertest(app);

describe('Tests app', function() {

  it('verify calculate', function(done) {
    request.get('/calculus?query=MTEgKyAzICogMTAgLTQ=').expect(200).end(function(err, result) {
        test.object(result.body).contains({error: 'false', result: '37'});
        done(err);
    });
  });

  

  it('verify equation with parenthesis', function(done) {
    request.get('/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk').expect(200).end(function(err, result) {
        test.object(result.body).contains({error: 'false', result: '-132.88888888888889'});
        done(err);
    });
  });

  it('negative calculate', function(done) {
    request.get('/calculus?query=NSArICgxMjAqNDY3KjIgLTU=').expect(400).end(function(err, result) {
        test.string(result.body.message).contains('SyntaxError: Parenthesis ) expected (char 18)');
        done(err);
    });
  });

  it('no input parameter', function(done) {
    request.get('/calculus').expect(400).end(function(err, result) {
        test.string(result.body.message).contains('No query parameter');
        done(err);
    });
  });

  it('invalid input test', function(done) {
    request.get('/calculus?query==').expect(400).end(function(err, result) {
        test.string(result.body.message).contains('Invalid expression');
        done(err);
    });
  });

});
