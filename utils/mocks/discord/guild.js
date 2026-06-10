const { Collection } = require('discord.js');
const config = require('../../../config');
const GuildMember = require('./guild-member');
const Role = require('./role');

class Guild {
  #members = new Collection();
  #roles = new Collection();
  #channels = new Collection();

  constructor({ members = [], channels = [], roles = [] }) {
    // Filling out values that is known to exist on the server
    Object.values(config.users)
      .map((user) => new GuildMember({ id: user.id, username: user.name }))
      .forEach((member) => this.#members.set(member.id, member));

    Object.values(config.roles)
      .map((role) => new Role(role.id, role.name))
      .forEach((role) => this.#roles.set(role.id, role));

    members.forEach((member) => {
      this.#members.set(member.id, member);
    });

    channels.forEach((channel) => {
      this.#channels.set(channel.id, channel);
    });

    roles.forEach((role) => {
      this.#roles.set(role.id, role);
    });
  }

  get channels() {
    return {
      cache: this.#channels,
      fetch: (id) => this.#channels.get(id),
    };
  }

  get members() {
    return {
      cache: this.#members,
      // TODO: After points overhaul, update to only call it using user id and not user object
      fetch: (user) => this.#members.get(user.id),
    };
  }

  get roles() {
    return {
      cache: this.#roles,
    };
  }
}

module.exports = Guild;
