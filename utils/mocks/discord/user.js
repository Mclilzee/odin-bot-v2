const { users } = require('../../../config');

class User {
  static odinBot = new User(users.odinBot.id, users.odinBot.name, true);
  constructor(id, username, bot) {
    this.id = id;
    this.username = username;
    this.bot = bot;

    this.send = jest.fn(async (msg) => msg);
    this.displayAvatarURL = () => 'image.jpg';
  }

  get displayName() {
    return this.username;
  }

  toString() {
    return `<@${this.id}>`;
  }
}

module.exports = User;
