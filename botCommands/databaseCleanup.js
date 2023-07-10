const axios = require('axios');
const { registerBotCommand } = require('../botEngine');
const config = require('../config');

axios.default.defaults.headers.patch.Authorization = `Token ${config.pointsbot.token}`;

const cleanUpPointsDatabase = {
  regex: /^!odin please cleanup!$/g,
  cb: async ({ author, guild }) => {
    const user = guild.members.cache.get(author.id);
    const isAdmin = user.roles.cache.some((value) => config.roles.adminRolesName.includes(value.name))
    if (isAdmin) {
      try {
        const active_discord_ids = guild.members.cache.map((member) => member.id);
        await axios.patch('http://localhost:3000/api/points/update', {
          active_discord_ids
        })
        return "Cleaned up successfully!!!"
      } catch (err) {
        return "Couldn't clean up, error occured"
      }
    }
  }
}

registerBotCommand(cleanUpPointsDatabase.regex, cleanUpPointsDatabase.cb);
module.exports = cleanUpPointsDatabase;
