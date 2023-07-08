const Discord = require('discord.js');
const axios = require('axios');
const { registerBotCommand } = require('../botEngine');

const leaderboard = {
  regex: /(?<!\S)!leaderboard(?!\S)/,
  async cb({ guild, content }) {
    try {
      const offsetString = content
        .split(' ')
        .find((word) => word.includes('start='));
      let offset = offsetString ? offsetString.replace('start=', '') : 1;
      offset = Math.max(offset, 1);

      const limitString = content.split(' ').find((word) => word.includes('n='));
      let limit = limitString ? limitString.replace('n=', '') : 5;

      const response = await axios.get(`http://localhost:3000/api/points?offset=${offset}&limit=${limit}`);
      const users = response.data;

      let usersList = '';
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const member = guild.members.cache.get(user.discord_id);
        const username = member
          ? member.displayName.replace(/!/g, '!')
          : "Left Server";
        if (i === 0) {
          usersList += `${i + 1} - ${username} [${user.points} points] :tada: \n`;
        } else {
          usersList += `${i + 1} - ${username} [${user.points} points] \n`;
        }
      }

      const leaderboardEmbed = new Discord.EmbedBuilder()
        .setColor('#cc9543')
        .setTitle('Leaderboard')
        .addFields([{ name: 'In Odin We Trust', value: usersList || 'Be the first to earn a point!' }]);

      return { embeds: [leaderboardEmbed] };
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

registerBotCommand(leaderboard.regex, leaderboard.cb);

module.exports = {
  leaderboard,
};
