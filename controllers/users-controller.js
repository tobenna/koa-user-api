var User = require('../models/user');
var parse = require('co-body');

var _user_id = function (request) {
  return parseInt(request.params.id);
}
module.exports = {
  show: function* () {
    var id = _user_id(this);
    var user = yield User.findOne(id);
    if (typeof user === 'undefined') {
      this.code = '404';
    }else{
      this.body = user;
    }
  },
  index: function* () {
    var users = yield User.all();
    this.body = users;
  },
  create: function* () {
    var params = yield parse(this);
    params.created = new Date();
    var savedUser = yield User.create(params);
    if (typeof savedUser.errors === 'undefined') {
      this.status= 201;
      this.body = { id: savedUser.id }
    }
    else {
      this.status = 422;
      this.body = { errors: savedUser.errors };
    }
  },
  update: function* () {
    var info = yield parse(this);
    var updatedUser = yield User.update(_user_id(this), info);
    if (Number.isInteger(updatedUser.id)){
      this.status = 204;
    }
    else {
      this.status = 422;
    }
  },

  search: function* () {
    var users = yield User.search(this.query.name);
    this.status = 200;
    this.body = users;
  },

  delete: function* () {
    if (yield User.delete(_user_id(this))){
      this.status = 200;
    }
  }
}
