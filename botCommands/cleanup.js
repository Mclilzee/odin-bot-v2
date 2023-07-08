const axios = require('axios');
const { registerBotCommand } = require('../botEngine');
const config = require('../config');

axios.default.defaults.headers.patch.Authorization = `Token ${config.pointsbot.token}`;

const cleanUpPointsDatabase = {
  regex: /^!odin please cleanup!$/g,
  cb: ({ author, guild }) => {
    const user = guild.members.cache.get(author.id);
    const isAdmin = user.roles.cache.some((value) => config.roles.adminRolesName.includes(value.name))
    if (isAdmin) {
      const active_discord_ids = guild.members.cache.map((member) => member.id);
      sendCleaningRequest(active_discord_ids);
    }

  }
}

async function sendCleaningRequest(active_discord_ids) {
  try {
    await axios.patch('http://localhost:3000/api/points/update', {
      active_discord_ids
    })
  } catch (err) {
    console.log(err);
  }
}

registerBotCommand(cleanUpPointsDatabase.regex, cleanUpPointsDatabase.cb);
module.exports = cleanUpPointsDatabase;
