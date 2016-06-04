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
    create: function* (user) {
      var data = yield this.all();
      data.push(user);
      yield fs.writeFile(userFile, JSON.stringify(data));
      return user;
    },
    delete: function* (_id) {
      var data = yield this.all();
      var index = data.findIndex(function (user) {
        return user.id === _id;
      });
      if (index > -1) {
        data.splice(index, 1);
        yield fs.writeFile(userFile, JSON.stringify(data));
      }
    },
    update: function* (userId, _params) {
      var userToUpdate = {}
      var data = yield this.all();
      userToUpdate = yield this.findOne(userId);
      for (var prop in _params) {
        if (userToUpdate.hasOwnProperty(prop)) {
          userToUpdate[prop] = _params[prop];
        }
      }
      yield this.delete(userId);
      var updatedUser = yield this.save(userToUpdate);
    },
    save: function* (user) {
      if (user.errors.length > 0) return false;
      var data = yield this.all();
      var userToSave = {}
      for (var prop in userSchema) {
        if (userSchema.hasOwnProperty(prop)) {
          userToSave[prop] = user[prop];
        }
      }
      data.push(userToSave);
      yield fs.writeFile(userFile, JSON.stringify([]));
      yield fs.writeFile(userFile, JSON.stringify(data));
      return userToSave;
    }
  }
}
