var User = function () {
    this.id = null;
    this.email = null;
    this.forename = null;
    this.surname = null;
    this.created = null;
    this.errors = [];

}

User.prototype._fill = function (info) {
  for (var prop in info) {
    if (this.hasOwnProperty(prop)) {
      this[prop] = info[prop];
      this._validate(prop, info[prop]);
    }
    else {
      this.errors.push(this.MESSAGES.invalidParams());
    }
  }
  return this;
};

User.prototype.MESSAGES = {
    invalidParams: function () {
      return 'Invalid parameters';
    },
    validationError: function (property) {
      return 'Validation error on ' + property + ' property';
    }
}

User.prototype._validations = {
    id: function (id) {
       return Number.isInteger(id);
    },
    forename: function () { return true },
    surname: function () { return true },
    created: function () { return true },
    email: function (email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
};

User.prototype._validate = function (prop, value) {
  if (this._validations[prop](value)) return;
  this.errors.push(this.MESSAGES.validationError(prop));
}

module.exports = function (info) {
  var user = new User();
  return user._fill(info);
};
