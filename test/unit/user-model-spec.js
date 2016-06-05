require('co-mocha');
var should = require('should');
var fs = require('co-fs');
var User = require('../../models/user.js');
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
  yield fs.writeFile('./data/users.json', '[]');
  yield User.create(userParams);
});

describe('users.create()', function () {
  it('Increases the number of users by 1',function* () {
    var users = yield User.all();
    yield User.create(userParams);
    var newUsers = yield User.all();
    newUsers.length.should.match(users.length + 1);
  });

  describe('With invalid parameters', function () {
    var users;

    it('Does not save',function* () {
      users = yield User.all();
      var badParamsUser = yield User.new({ badParams: 'Bad param' });
      var badUser = yield User.save(badParamsUser);
      badUser.should.be.false();
      var newUsers = yield User.all();
      newUsers.length.should.match(users.length);
    });

    it('Reports invalid parameters',function* () {
      var badParamsUser = yield User.new({ badParams: 'Bad param' });
      badParamsUser.errors[0].should.match('Invalid parameters');
    });


  });

  it('Does not create with invalid email',function* () {
    var badUser = { id: 2, email: 'notandemail' };
    var users = yield User.all();
    var userToSave = yield User.new(badUser);
    yield User.save(userToSave);
    var newUsers = yield User.all();
    newUsers.should.match(users);
  });
});

describe('users.find(:id)', function () {
  it('finds the user with a certian id',function* () {
    var foundUser = yield User.findOne(1);
    foundUser.should.match(testUser);
  });

  it('returns undefined if cannot find user',function* () {
    var foundUser = yield User.findOne(5);
    (typeof foundUser).should.match('undefined');
  });

  it('returns undefined for invalid parameter',function* () {
    var foundUser = yield User.findOne("NotAUserId");
    (typeof foundUser).should.match('undefined');
  });
});

describe('users.all', function () {
  it('shows the list of users',function* () {
    var users = yield User.all();
    users.should.match([testUser]);
  });
});

describe('users.delete(:id)', function () {
  it('deletes the user with a certian id',function* () {
    yield User.delete(1);
    var users = yield User.all();
    users.length.should.equal(0);
  });

  it('does not delete if not found',function* () {
    yield User.delete("Not my id");
    var users = yield User.all();
    users.length.should.equal(1);
  });
});

describe('users.update(:id, :params)', function () {
  it('updates the user with a certian id',function* () {
    var params = { email: 'test2@email.com' }
    yield User.update(1, params);
    var updatedUser = yield User.findOne(1);
    updatedUser.email.should.equal(params.email);
  });
});


afterEach(function *() {
  yield fs.writeFile('./data/users.json', '[]')
});
