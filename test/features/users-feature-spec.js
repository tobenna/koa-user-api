require('co-mocha');
var should = require('should');
var fs = require('co-fs');
var server = require('../../server');
var request = require('co-supertest').agent(server.listen());
var data = require('../../models/user.js');
var User = require('../../modules/user');
var userFile = './data/users.json';

describe('GET /users/:id ', function(){
  var date = new Date();
  var userParams = {
      email:    'test@email.com',
      forename: 'Tobenna',
      surname:  'Ndu',
      created: date.toString()
  }

  beforeEach(function* () {
    yield fs.writeFile('./data/users.json', '[]');
    yield data.users.create(userParams);
  });

  afterEach(function* () {
    yield fs.writeFile('./data/users.json', '[]')
  });

  it('returns JSON for an existing user', function* () {
    yield request.get('/users/' + 1)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(new RegExp(userParams.forename))
	  .expect(new RegExp(userParams.surname))
    .expect(new RegExp(userParams.email))
    .end();
  });
  it('returns 404 not found if user doesn\'t exsit', function* () {
    var res = yield request.get('/users/' + 5).expect(404).end();
    res.status.should.equal(404);
  });
});

describe('GET /users/ ', function(){
  var date = new Date();
  var userParams = {
      email:    'test@email.com',
      forename: 'Tobenna',
      surname:  'Ndu',
      created: date.toString()
  }

  beforeEach(function* () {
    yield fs.writeFile('./data/users.json', '[]');
    yield data.users.create(userParams);
    yield data.users.create(userParams);
    yield data.users.create(userParams);
  });

  afterEach(function* () {
    yield fs.writeFile('./data/users.json', '[]')
  });

  it('returns JSON for an existing user', function* () {
    var allUsers = yield request.get('/users/')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(new RegExp(userParams.forename))
	  .expect(new RegExp(userParams.surname))
    .expect(new RegExp(userParams.email))
    .end();
    allUsers.body.length.should.equal(3);
  });
});

describe('POST /users/ ', function(){
  var userParams = {
      email:    'test@email.com',
      forename: 'Tobenna',
      surname:  'Ndu'
  }

  beforeEach(function* () {
    yield fs.writeFile('./data/users.json', '[]');
  });

  afterEach(function* () {
    yield fs.writeFile('./data/users.json', '[]')
  });

  it('returns location of created user', function* () {
    var res = yield request.post('/users/').send(userParams)
    .expect(201).end();
    var userGotten = yield request.get('/users/1').expect(200).end();
    userGotten.body.forename.should.equal(userParams.forename);
  });

  it('returns validation errors validation fails', function* () {
    userParams.email = 'notanemail';
    var res = yield request.post('/users/').send(userParams)
    .expect(422).end();
    res.body.errors.length.should.equal(1);
    res.body.errors[0].should.match('Validation error on email property');
  });
});

describe('PUT /users/:id ', function(){
  var date = new Date();

  var userParams = {
      email:    'test@email.com',
      forename: 'Tobenna',
      surname:  'Ndu',
      created: date.toString()
  }

  beforeEach(function* () {
    yield fs.writeFile('./data/users.json', '[]');
    yield data.users.create(userParams);
  });

  afterEach(function* () {
    yield fs.writeFile('./data/users.json', '[]')
  });

  it('it returns no content to show success', function* () {
    var updateParams = { email: "tes2t@email.com" };
    var res = yield request.put('/users/' + 1).send(updateParams)
    .expect(204).end();
    var userGotten = yield request.get('/users/'+1).expect(200).end();
    userGotten.body.email.should.equal(updateParams.email);
  });

  it('it does not update when bad params', function* () {
    var updateParams = { badParam: "tes2t@email.com" };
    var res = yield request.put('/users/' + 1).send(updateParams)
    .expect(422).end();
    var userGotten = yield request.get('/users/'+ 1 ).expect(200).end();
    userGotten.body.email.should.equal(userParams.email);
  });

});


describe('DELETE /users/:id ', function(){
  var date = new Date();

  var userParams = {
      email:    'test@email.com',
      forename: 'Tobenna',
      surname:  'Ndu',
      created: date.toString()
  }

  beforeEach(function* () {
    yield fs.writeFile('./data/users.json', '[]');
    yield data.users.create(userParams);
  });

  afterEach(function* () {
    yield fs.writeFile('./data/users.json', '[]')
  });

  it('returns success after deleting', function* () {
    var res = yield request.delete('/users/' + 1)
    .expect(200).end();
    var userGotten = yield request.get('/users/'+ 1)
    .expect(404).end();
  });

  it('does not delete if doesnt find user', function* () {
    var res = yield request.delete('/users/' + 'notAnID')
    .expect(404).end();
  });
});