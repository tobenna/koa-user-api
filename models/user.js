var fs = require('co-fs');
var userFile = './data/users.json';
var User = require('../modules/user');
var userSchema = require ('../schemas/user');
module.exports = {
  data: function* () {
    var file = yield fs.readFile(userFile, 'utf-8');
    return file;
  },
  all: function* () {
    return JSON.parse(yield this.data);
  },
  _all: function* () {
    var returnedUsers = JSON.parse(yield this.data);
    return returnedUsers.map(function (user) {
      return new User(user);
    });
  },
  findOne: function* (_id) {
    var data = yield this._all();
    var user = data.find(function (user) {
      return user.id === _id;
    });
    return user;
  },
  new: function (params) {
    return new User(params);
  },
  create: function* (params) {
    var data = yield this.all();
    var newUser = this.new(params);
    var savedUser = yield this.save(newUser);
    if (savedUser) return savedUser;
    return newUser;
  },
  delete: function* (_id) {
    var data = yield this.all();
    var userToDelete = yield this.findOne(_id);
    if (typeof userToDelete === 'undefined') return false;
    data.splice(userToDelete.index);
    yield fs.writeFile(userFile, JSON.stringify(data));
    return true;
  },
  update: function* (userId, _params) {
    var data = yield this._all();
    var validatedParams = this.new(_params);
    if (validatedParams.errors.length > 0) return false;
    var userToUpdate = yield this.findOne(userId);
    for (var prop in _params) {
      userToUpdate[prop] = _params[prop];
    }
    yield this.delete(userId);
    return yield this.save(userToUpdate);
  },
  save: function* (user) {
    if (user.errors.length > 0) return false;
    var data = yield this.all();
    var userToSave = {};
    for (var prop in userSchema) {
      userToSave[prop] = user[prop];
    }
    data.push(this._setId(userToSave, data));
    yield fs.writeFile(userFile, JSON.stringify(data));
    return userToSave;
  },
  search: function* (term) {
    var self = this;
    var users = yield this.all();
    return users.filter(function (user) {
      return self.new(user).isLike(term);
    });
  },
  _setId: function (userToSave, data) {
    var lastUser = data[data.length -1 ];
    if (typeof lastUser === 'undefined'){
      userToSave.id = 1;
    }
    else {
      userToSave.id = lastUser.id + 1;
    }
    return userToSave;
  }
};
