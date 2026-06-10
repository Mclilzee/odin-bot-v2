const { users } = require('../../../config');

class User {
  static odinBot = new User(users.odinBot.id, users.odinBot.name);
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }

  get displayName() {
    return this.username;
  }

  toString() {
    return `<@${this.id}>`;
  }
}

module.exports = User;
