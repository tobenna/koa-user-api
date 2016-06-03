require('co-mocha');
var should = require('should');
var fs = require('co-fs');
var server = require('../../server');
var request = require('co-supertest').agent(server.listen());
var data = require('../../models/user.js');
var User = require('../../modules/user');
var userFile = './data/users.json';

describe('GET users/:id ', function(){
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

  afterEach(function *() {
    yield fs.writeFile('./data/users.json', '[]')
  });

  it('returns JSON for an existing user', function* () {
    var res = yield request.get('/users/' + testUser.id)
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
	// it('returns JSON for existing user', function (done) {
	// 	co(function *() {
	// 		// Insert test user in database
	// 		var user = yield users.insert(test_user);
	// 		var userUrl = '/' + user._id;
  //
	// 		// Get
	// 		request
	// 			.get(userUrl)
	//       		.set('Accept', 'application/json')
	//       		.expect('Content-Type', /json/)
	//       		.expect(/Marcus/)
	//       		.expect(/Bandung, Indonesia/)
	//       		.expect(200, done);
	//     });
	// });
});
