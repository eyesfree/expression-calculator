'use strict';

const supertest = require('supertest');
const app = require('../app.js');

const request = supertest(app);

describe('Tests app', function() {

  it('verify calculate', function() {
    return supertest(app)
              .get('/calculus?query=MTEgKyAzICogMTAgLTQ=')
              .expect(200)
              .expect('Content-Type',/json/)
              .expect({error: 'false', result: '37'});
    });

  it('verify equation with parenthesis', function() {
    return supertest(app)
              .get('/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk')
              .expect(200)
              .expect('Content-Type',/json/)
              .expect({error: 'false', result: '-132.88888888888889'});
  });

  it('negative calculate', function() {
    return supertest(app)
              .get('/calculus?query=NSArICgxMjAqNDY3KjIgLTU=')
              .expect(400)
              .expect('Content-Type',/json/)
              .expect({error: 'true', message:'Calculation error: SyntaxError: Parenthesis ) expected (char 18)'});
  });

  it('no input parameter', function() {
    return supertest(app)
              .get('/calculus')
              .expect(400)
              .expect('Content-Type',/json/)
              .expect({error: 'true', message: 'No query parameter set.'});
  });

  it('invalid input test', function() {
    return supertest(app)
              .get('/calculus?query==')
              .expect(400)
              .expect('Content-Type',/json/)
              .expect({error: 'true', message:'Calculation error: Invalid expression passed as query.'});
  });

});
