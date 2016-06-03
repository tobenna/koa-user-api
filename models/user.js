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
    find: function* (_id) {
      var data = yield this.all();
      var user = data.find(function (user) {
        return user.id === _id;
      });
      return user;
    },
    new: function* (params) {
    },
    create: function* (user) {
      var data = yield this.all();
      data.push(user);
      yield fs.writeFile(userFile, JSON.stringify(data));
      return user;
    },
    delete: function *(_id) {
      var data = yield this.all();
      var index = data.findIndex(function (user) {
        return user.id === _id;
      });
      if (index > -1) {
        data.splice(index, 1);
        yield fs.writeFile(userFile, JSON.stringify(data));
      }
    },
    update: function* (_id, _params) {
      var data = yield this.all();
      var userToUpdate = yield this.find(_id);
      for (var prop in _params) {
        if (_params.hasOwnProperty(prop)) {
          userToUpdate[prop] = _params[prop];
        }
      }
      yield this.delete(_id);
      yield this.save(userToUpdate);
    },
    save: function* (user) {
      var data = yield this.all();
      var userToSave = {}
      for (var prop in userSchema) {
        if (userSchema.hasOwnProperty(prop)) {
          userToSave[prop] = user[prop];
        }
      }
      data.push(userToSave);
      yield fs.writeFile(userFile, JSON.stringify(data));
      return user;
    }
  }
}
