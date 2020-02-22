'use strict';

const supertest = require('supertest'); 
const test = require('unit.js');
const app = require('../app.js');

const request = supertest(app);

describe('Tests app', function() {

  it('verify calculate', function(done) {
    request.get('/calculate?input=MTEgKyAzICogMTAgLTQ=').expect(200).end(function(err, result) {
        test.string(result.body.result).contains('37');
        done(err);
    });
  });

});
