require('co-mocha');
var should = require('should');
var fs = require('co-fs');
var data = require('../../models/user.js');
var User = require('../../modules/user');
var testUser = {}
var date = new Date();
beforeEach(function* () {
  var options = {
      id:        1,
      email:    'test@email.com',
      forename: 'Tobenna',
      surname:  'Ndu',
      created: date.toString()
  }
  testUser = new User(options);
  yield fs.writeFile('./data/users.json', '[]');
  yield data.users.create(testUser);
});

describe('users.all', function () {
  it('shows the list of users',function* () {
    var users = yield data.users.all();
    users.should.match([testUser]);
  });
});

describe('users.find(:id)', function () {
  it('finds the user with a certian id',function* () {
    var foundUser = yield data.users.find(1);
    foundUser.should.match(testUser);
  });
});

describe('users.delete(:id)', function () {
  it('deletes the user with a certian id',function* () {
    yield data.users.delete(1);
    var users = yield data.users.all();
    users.length.should.equal(0);
  });
});

describe('users.update(:id, :params)', function () {
  it('updates the user with a certian id',function* () {
    var params = { email: 'test2@email.com' }
    yield data.users.update(1, params);
    var updatedUser = yield data.users.find(1);
    updatedUser.email.should.equal(params.email);
  });
});

afterEach(function *() {
  yield fs.writeFile('./data/users.json', '[]')
});
