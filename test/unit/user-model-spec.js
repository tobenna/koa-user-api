require('co-mocha');
var should = require('should');
var fs = require('co-fs');

var data = require('../../models/user.js');


before(function *() {
  yield fs.writeFile('./data/users.json', '[]')
});

describe('user data', function () {
  it('should have a new user',function* () {
    var users = yield data.users.all();
    yield data.users.create({ name: 'John' });
    var newUsers = yield data.users.all();

    newUsers.length.should.equal(users.length + 1);
  });
});

after(function *() {
  yield fs.writeFile('./data/users.json', '[]')
});
