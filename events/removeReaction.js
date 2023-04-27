const { threadID, requiredPermission } = require('../config.json');
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'messageReactionRemove',
  async execute(reaction, user) {
    if (user.bot) return;
    if (reaction.emoji.name !== '🪡') return;
    const message = reaction.message;

    // Fetch member and check if they are an administrator
    const member = await message.guild.members.fetch(user.id);
    if (!member.permissions.has(PermissionsBitField.Flags[requiredPermission])) return;

    if (message) {
      // empty the threadID array
      threadID.length = 0;
    }
  },
};
