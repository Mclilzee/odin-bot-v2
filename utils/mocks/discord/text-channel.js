class TextChannel {
  constructor(id) {
    this.id = id;
    this.send = jest.fn(async (msg) => msg);
  }
}

module.exports = TextChannel;
