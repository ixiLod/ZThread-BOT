const { threadID } = require('../config.json');
const { checkPermission } = require('../helpers/permissionCheck');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    if (reaction.emoji.name !== '🪡') return;
    const message = reaction.message;

    const hasPermission = await checkPermission(user, message);
    if (!hasPermission) return;

    // Return if channel is a forum or a DM
    if (!message.channel.guild) return;
    if (message.channel.parent?.type === 'GUILD_CATEGORY') return;

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
