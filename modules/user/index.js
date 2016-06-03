var User = function () {
    this.id = null;
    this.email = null;
    this.forename = null;
    this.surname = null;
    this.created = null;
}

User.prototype._fill = function (info) {
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) {
      this[prop] = info[prop];
    }
  }
  return this;
};

module.exports = function (info) {
  var user = new User();
  return user._fill(info);
};
