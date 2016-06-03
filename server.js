var koa = require('koa');
var app = module.exports = koa();
var router = require('koa-router')();
var data = require('./models/user');


router.get('/users/:id', function* (id) {
  var id = parseInt(this.params.id);
  var user = yield data.users.find(id);
  if (typeof user === 'undefined') {
    this.code = '404';
  }else{
    this.body = user;
  }
});

app.use(router.routes());
