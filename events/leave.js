const axios = require('axios');
const config = require('../config');
const { Events } = require('discord.js');

axios.default.defaults.headers.patch.Authorization = `Token ${config.pointsbot.token}`;

let eventStarted = false;
let inactive_discord_ids = [];

module.exports = {
  name: Events.GuildMemberRemove,
  execute: () => (User) => {
    inactive_discord_ids.push(User.id);

    if (!eventStarted) {
      eventStarted = true;
      setTimeout(setUsersActivityToFalse, 20000)

    }
  }
}

async function setUsersActivityToFalse() {
  eventStarted = false;
  try {
    await axios.patch("http://localhost:3000/api/points/update", {
      inactive_discord_ids
    })

    inactive_discord_ids = [];

  } catch (err) {
    console.log(err);
  }
}
