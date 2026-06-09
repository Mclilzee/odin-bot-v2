const { roles } = require('../config');

const adminRoleIds = [
  roles.admin.id,
  roles.core.id,
  roles.maintainer.id,
  roles.moderator.id,
];

function isAdmin(member) {
  return member?.roles.cache.some((role) =>
    adminRoleIds.some((id) => role.id === id),
  );
}

module.exports = { isAdmin };
