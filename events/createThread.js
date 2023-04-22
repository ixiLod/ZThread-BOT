const { threadID } = require('../config.json');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    // Return if user is bot
    if (user.bot) return;
    // Return if reaction is not 🪡
    if (reaction.emoji.name !== '🪡') return;
    // Focus on the reaction message
    const message = reaction.message;
    // Return if channel is a thread, a forum or a DM
    if (message.channel.isThread()) return;
    if (!message.channel.guild) return;
    if (message.channel.parent?.type === 'GUILD_CATEGORY') return;
    // Create a new thread
    const thread = await message.startThread({
      name: `Thread édité par ${message.author.username} à l'aide de ${client.user.username} `,
      autoArchiveDuration: 60,
      reason: 'New thread created',
    });
    // Save thread ID in config.json
    threadID[0] = thread.id;
    // console.log({ message });
  },
};
