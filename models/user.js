var fs = require('co-fs');
var userFile = './data/users.json';
var User = require('../modules/user');
var userSchema = require ('../schemas/user');
module.exports = {
  users: {
    data: function* () {
      var file = yield fs.readFile(userFile, 'utf-8');
      return file;
    },
    all: function* () {
      var returnedUsers = JSON.parse(yield this.data);
      return returnedUsers.map(function (user) {
        return new User(user);
      });
    },
    findOne: function* (_id) {
      var data = yield this.all();
      var user = data.find(function (user) {
        return user.id === _id;
      });
      return user;
    },
    new: function* (params) {
      return new User(params);
    },
    create: function* (params) {
      var data = yield this.all();
      var lastUser = data[data.length -1 ];
      if (typeof lastUser === 'undefined'){
        params.id = 1;
      }else{
        params.id = lastUser.id + 1;
      }
      var createdUser = yield this.new(params);
      var savedUser = yield this.save(createdUser);
      data.push(savedUser);
      yield fs.writeFile(userFile, JSON.stringify(data));
      return savedUser;
    },
    delete: function* (_id) {
      var data = yield this.all();
      var index = data.findIndex(function (user) {
        return user.id === _id;
      });
      if (index > -1) {
        data.splice(index, 1);
        yield fs.writeFile(userFile, JSON.stringify(data));
        return true;
      }
      else {
        yield fs.writeFile(userFile, JSON.stringify(data));
        return false;
      }
    },
    update: function* (userId, _params) {
      var userToUpdate = {}
      var data = yield this.all();
      var validatedParams = yield this.new(_params);
      if (validatedParams.errors.length > 0) return false;
      userToUpdate = yield this.findOne(userId);
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
      data.push(userToSave);
      yield fs.writeFile(userFile, JSON.stringify([]));
      yield fs.writeFile(userFile, JSON.stringify(data));
      return userToSave;
    }
  }
}
