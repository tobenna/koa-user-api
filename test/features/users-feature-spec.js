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
      id:        1,
      email:    'test@email.com',
      forename: 'Tobenna',
      surname:  'Ndu',
      created: date.toString()
  }

  beforeEach(function* () {
    testUser = new User(userParams);
    yield fs.writeFile('./data/users.json', '[]');
    yield data.users.create(testUser);
  });

  afterEach(function* () {
    yield fs.writeFile('./data/users.json', '[]')
  });

  it('returns JSON for an existing user', function* () {
    yield request.get('/users/' + testUser.id)
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

  it('returns JSON for an existing user', function* () {
    var res = yield request.post('/users/').send(userParams)
    .expect(201).end();
    var userGotten = yield request.get('/users/1').expect(200).end();
    userGotten.body.forename.should.equal(userParams.forename);
  });
});
