require('co-mocha');
var should = require('should');
var fs = require('co-fs');
var data = require('../../models/user.js');
var User = require('../../modules/user');
var testUser = {}
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

describe('users.create()', function () {
  it('Increases the number of users by 1',function* () {
    var users = yield data.users.all();
    yield data.users.create(userParams);
    var newUsers = yield data.users.all();
    newUsers.length.should.match(users.length + 1);
  });

  it('Does not create with invalid email',function* () {
    var badUser = { id: 2, email: 'notandemail' };
    var users = yield data.users.all();
    var userToSave = yield data.users.new(badUser);
    yield data.users.save(userToSave);
    var newUsers = yield data.users.all();
    newUsers.length.should.match(users.length);
  });
});

describe('users.find(:id)', function () {
  it('finds the user with a certian id',function* () {
    var foundUser = yield data.users.find(1);
    foundUser.should.match(testUser);
  });
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
