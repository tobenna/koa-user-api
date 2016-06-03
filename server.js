var koa = require('koa');
var parse = require('co-body');
var app = module.exports = koa();
var router = require('koa-router')();
var data = require('./models/user');


router.get('/users/:id', function* () {
  var id = parseInt(this.params.id);
  var user = yield data.users.find(id);
  if (typeof user === 'undefined') {
    this.code = '404';
  }else{
    this.body = user;
  }
});

router.post('/users/', function* () {
  var params = yield parse(this);
  params.id = 1;
  var user = yield data.users.new(params);
  var savedUser = yield data.users.save(user);
  if (savedUser) {
    this.status= 201;
    this.body = { id: savedUser.id }
  }
  else {
    this.status(409);
  }
});

app.use(router.routes());
