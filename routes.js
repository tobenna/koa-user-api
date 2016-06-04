var router = require('koa-router')();
var parse = require('co-body');
var data = require('./models/user');

router.get('/users/:id', function* () {
  var id = parseInt(this.params.id);
  var user = yield data.users.findOne(id);
  if (typeof user === 'undefined') {
    this.code = '404';
  }else{
    this.body = user;
  }
});

router.post('/users/', function* () {
  var params = yield parse(this);
  params.id = 1;
  params.created = new Date();
  var user = yield data.users.new(params);
  var savedUser = yield data.users.save(user);
  if (savedUser) {
    this.status= 201;
    this.body = { id: savedUser.id }
  }
  else {
    this.status = 409;
    var response = { errors: [] }
    user.errors.forEach(function (err) {
      response.errors.push(err);
    });
    this.body = response;
  }
});

router.put('/users/:id', function* () {
  var updateInfo = yield parse(this);
  var id = parseInt(this.params.id);
  var updatedUser = yield data.users.update(id, updateInfo);
  this.status = 204;
});

module.exports = router.routes();
