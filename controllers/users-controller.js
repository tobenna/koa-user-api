var data = require('../models/user');
var parse = require('co-body');

module.exports = {
  show: function* () {
    var id = parseInt(this.params.id);
    var user = yield data.users.findOne(id);
    if (typeof user === 'undefined') {
      this.code = '404';
    }else{
      this.body = user;
    }
  },
  index: function* () {
    var users = yield data.users.all();
    this.body = users;
  },
  create: function* () {
    var params = yield parse(this);
    params.created = new Date();
    var user = yield data.users.new(params);
    var savedUser = yield data.users.save(user);
    if (savedUser) {
      this.status= 201;
      this.body = { id: savedUser.id }
    }
    else {
      this.status = 422;
      var response = { errors: [] }
      user.errors.forEach(function (err) {
        response.errors.push(err);
      });
      this.body = response;
    }
  },
  update: function* () {
    var updateInfo = yield parse(this);
    var id = parseInt(this.params.id);
    var updatedUser = yield data.users.update(id, updateInfo);
    if (updatedUser){
      this.status = 204;
    }
    else {
      this.status = 422;
    }
  },
  delete: function* () {
    var id = parseInt(this.params.id);
    if(yield data.users.delete(id)){
      this.status = 200;
    }
    else {
      this.status = 404;
    }
  }
}
