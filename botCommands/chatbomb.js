const { registerBotCommand } = require('../botEngine');
let messagesCount = 0;
let authorID = undefined;
let timeoutID = undefined;

const command = {
  cb: ({ author }) => {
    if (authorID === author.id) {
      messagesCount++;
      if (timeoutID === undefined) {
        timeoutID = setTimeout(() => messagesCount = 0, 30000);
      }
    } else {
      if (timeoutID !== undefined) {
        clearTimeout(timeoutID);
      }
      authorID = author.id;
      messagesCount = 1;
    }

    if (messagesCount >= 5) {
      messagesCount = 0;
      return "Stop it!! that's illegal you can't chat bomb";
    }

    console.log("timeout", timeoutID);
    console.log("lastauthor", author.id);
    console.log("messageCount", messagesCount);
  }
};

registerBotCommand(command.regex, command.cb);

module.exports = command;
