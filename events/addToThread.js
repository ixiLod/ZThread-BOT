const { threadID } = require('../config.json');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    // Return if user is bot
    if (user.bot) return;
    // Return if reaction is not 🧵
    if (reaction.emoji.name !== '🧵') return;
    // Focus on the reaction message
    const message = reaction.message;
    // Return if channel is a thread, a forum or a DM
    if (message.channel.isThread()) return;
    if (!message.channel.guild) return;
    if (message.channel.parent?.type === 'GUILD_CATEGORY') return;
    // Get the thread ID
    const threadChannel = client.channels.cache.get(threadID[0]);

    if (!threadChannel) {
      console.error(`Thread channel with ID "${threadID}" not found.`);
      return;
    }

    // Get the thread
    const thread = await threadChannel.fetch();

    if (!thread) {
      console.error(`Thread with ID "${threadID}" not found.`);
      return;
    }

    // Get the date of the message
    const date = new Date(message.createdTimestamp);
    const globalDate = date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    const hour = date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    // Send the message in the thread and delete the original message
    try {
      const threadMessage = await thread.send(
        `**${message.author.username}** 💬 *${globalDate} à ${hour}* \n${message.content}\n\n----------\n\n`
      );
      message.delete();
    } catch (error) {
      console.error(error);
    }
  },
};
