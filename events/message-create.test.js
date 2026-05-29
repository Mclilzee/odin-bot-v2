const { Guild, GuildMember, Role } = require('../utils/mocks/discord');

jest.mock('../services/spam-kick/spammer-kick-service', () => ({
  kick: jest.fn(),
  warn: jest.fn(),
}));

describe('Spam detection', () => {
  let execute;
  let SpamKickingService;

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 1)));
    SpamKickingService = require('../services/spam-kick/spammer-kick-service');
    execute = require('./message-create').execute({ user: {} });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  function createSpamMessage(authorId = 'user-123') {
    const guild = new Guild({ channels: [] });
    const member = new GuildMember({
      id: authorId,
      username: 'spammer',
      guild,
      roles: [new Role(0, 'casual-user')],
    });
    return {
      author: member.user,
      attachments: { size: 4 },
      member,
      delete: jest.fn(),
    };
  }

  it('deletes message on spam offense', async () => {
    const message = createSpamMessage();
    await execute(message);
    expect(message.delete).toHaveBeenCalledTimes(1);
  });

  it('warns user on first spam offense', async () => {
    await execute(createSpamMessage());
    expect(SpamKickingService.warn).toHaveBeenCalledTimes(1);
    expect(SpamKickingService.kick).not.toHaveBeenCalled();
  });

  it('kicks user on second offense within 24 hours', async () => {
    const message = createSpamMessage();
    await execute(message);
    await execute(message);
    expect(SpamKickingService.warn).toHaveBeenCalledTimes(1);
    expect(SpamKickingService.kick).toHaveBeenCalledTimes(1);
  });

  it('warns user again after 24 hours have passed since first offense', async () => {
    const message = createSpamMessage();
    await execute(message);
    jest.advanceTimersByTime(24 * 60 * 60 * 1000 + 1);
    await execute(message);
    expect(SpamKickingService.warn).toHaveBeenCalledTimes(2);
    expect(SpamKickingService.kick).not.toHaveBeenCalled();
  });
});
