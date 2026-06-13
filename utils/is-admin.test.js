const { GuildMember, Role } = require('./mocks/discord');
const { isAdmin } = require('./is-admin');

describe('isAdmin', () => {
  it.each([[Role.ADMIN], [Role.CORE], [Role.MAINTAINER], [Role.MODERATOR]])(
    'returns true if the user has the "%s" role',
    (role) => {
      const member = new GuildMember({ roles: [role] });
      expect(isAdmin(member)).toBe(true);
    },
  );

  it('returns false if the user does not have an admin role', () => {
    const member = new GuildMember({ roles: [] });
    expect(isAdmin(member)).toBe(false);
  });
});
