var fs = require('co-fs');
var userFile = './data/users.json';
var User = require('../modules/user');
module.exports = {
  users: {
    all: function *() {
      var data = yield fs.readFile(userFile, 'utf-8');
      var returnedUsers = JSON.parse(data);
      return returnedUsers.map(function (user) {
        return new User(user);
      });
    },
    find: function *(_id) {
      var data = yield this.all();
      var user = data.find(function (user) {
        return user.id === _id;
      });
      return user;
    },
    create: function *(user) {
      var data = yield this.all();
      data.push(user);
      yield fs.writeFile(userFile, JSON.stringify(data))
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
    }
  }
}
