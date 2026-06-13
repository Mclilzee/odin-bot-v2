const { roles } = require('../../../config');

class Role {
  static ADMIN = new Role(roles.admin.id, roles.admin.name);
  static CORE = new Role(roles.core.id, roles.core.name);
  static MAINTAINER = new Role(roles.maintainer.id, roles.maintainer.name);
  static MODERATOR = new Role(roles.moderator.id, roles.moderator.name);
  static NOBOT = new Role(roles.nobot.id, roles.nobot.name);
  static CLUB40 = new Role(roles.club40.id, roles.club40.name);

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

module.exports = Role;
