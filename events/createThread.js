const { threadID, requiredPermission } = require('../config.json');
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    // Return if user is bot
    if (user.bot) return;
    // Return if reaction is not 🪡
    if (reaction.emoji.name !== '🪡') return;
    // Focus on the reaction message
    const message = reaction.message;
    // Return if channel is a forum or a DM
    if (!message.channel.guild) return;
    if (message.channel.parent?.type === 'GUILD_CATEGORY') return;

    // Fetch member and check if they are an administrator
    const member = await message.guild.members.fetch(user.id);
    if (!member.permissions.has(PermissionsBitField.Flags[requiredPermission])) return;

    // Add ID to threadID array if message is a thread
    if (message.thread) {
      threadID[0] = message.id;
      return;
    } else {
      try {
        // Create a new thread
        const newThread = await message.startThread({
          name: `Thread édité à l'aide de ${client.user.username}`,
          autoArchiveDuration: 60,
          reason: 'New thread created',
        });
        // Save thread ID in config.json
        threadID[0] = newThread.id;
      } catch (error) {
        console.error('Could not start thread:', error);
      }
    }
  },
};
