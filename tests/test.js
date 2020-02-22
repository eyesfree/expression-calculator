'use strict';

const supertest = require('supertest'); 
const test = require('unit.js');
const app = require('../app.js');

const request = supertest(app);

describe('Tests app', function() {

  it('verify calculate', function(done) {
    request.get('/calculate?input=MTEgKyAzICogMTAgLTQ=').expect(200).end(function(err, result) {
        test.object(result.body).contains({error: 'false', result: '37'});
        done(err);
    });
  });

  it('negative calculate', function(done) {
    request.get('/calculate?input=NSArICgxMjAqNDY3KjIgLTU=').expect(200).end(function(err, result) {
        test.string(result.body.message).contains('SyntaxError: Parenthesis ) expected (char 18)');
        done(err);
    });
  });

  it('no input parameter', function(done) {
    request.get('/calculate').expect(200).end(function(err, result) {
        test.string(result.body.message).contains('No input parameter');
        done(err);
    });
  });

});
