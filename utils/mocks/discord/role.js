const { roles } = require('../../../config');

class Role {
  static admin = new Role(roles.admin.id, roles.admin.name);
  static core = new Role(roles.core.id, roles.core.name);
  static maintainer = new Role(roles.maintainer.id, roles.maintainer.name);
  static moderator = new Role(roles.moderator.id, roles.moderator.name);
  static nobot = new Role(roles.nobot.id, roles.nobot.name);
  static club40 = new Role(roles.club40.id, roles.club40.name);

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

module.exports = Role;
