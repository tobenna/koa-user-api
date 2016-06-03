var fs = require('co-fs');
var userFile = './data/users.json';
module.exports = {
  users: {
    all: function *() {
      var data = yield fs.readFile(userFile, 'utf-8');
      return JSON.parse(data);
    },
    // find: function *(id) {
    //
    // },
    create: function *(user) {
      var users = yield this.all();

      users.push(user);

      yield fs.writeFile(userFile, JSON.stringify(users))
    }
  }
}
