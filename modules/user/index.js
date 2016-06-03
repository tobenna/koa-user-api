var User = function () {
    this.id = null;
    this.email = null;
    this.forename = null;
    this.surname = null;
    this.created = null;
}

User.prototype._fill = function (info) {
  for (var prop in this) {
    console.log(prop);
    if (this.hasOwnProperty(prop)) {
      this[prop] = info[prop];
    }
  }
  return this;
};

User.prototype.getInformation = function () {
  return this.data;
};

module.exports = function (info) {
  var user = new User();
  return user._fill(info);
};
