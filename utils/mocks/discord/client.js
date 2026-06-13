const { Collection } = require('discord.js');
const config = require('../../../config');
const User = require('./user');

class Client {
  user = User.ODIN_BOT;
  #users = new Collection();
  #channels = new Collection();

  constructor({ users = [], channels = [] }) {
    Object.values(config.users)
      .map((user) => new User({ id: user.id, username: user.name }))
      .forEach((user) => this.#users.set(user.id, user));

    users.forEach((user) => {
      this.#users.set(user.id, user);
    });

    // This makes sure odinBot user and the user in the collection is the same Object, otherwise client will fail equallity checks in the tests
    this.#users.set(this.user.id, this.user);

    channels.forEach((channel) => {
      this.#channels.set(channel.id, channel);
    });
  }

  get channels() {
    return {
      cache: this.#channels,
    };
  }

  get users() {
    return {
      cache: this.#users,
    };
  }
}

module.exports = Client;
