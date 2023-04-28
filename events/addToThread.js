const { threadID, requiredPermission } = require('../config.json');
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    if (user.bot) return;
    if (reaction.emoji.name !== '🧵') return;
    const message = reaction.message;
    // Return if channel is a thread, a forum or a DM, or message has the same ID
    if (message.channel.isThread()) return;
    if (!message.channel.guild) return;
    if (message.channel.parent?.type === 'GUILD_CATEGORY') return;
    if (message.id === threadID[0]) return;

    // Fetch member and check if they are an administrator
    const member = await message.guild.members.fetch(user.id);
    if (!member.permissions.has(PermissionsBitField.Flags[requiredPermission])) return;

    try {
      // Get the thread ID
      const threadChannel = client.channels.cache.get(threadID[0]);

      if (!threadChannel) {
        console.error(`Thread channel with ID "${threadID}" not found.`);
        message.channel.send(
          `${user.username}, le message cible n'a pas pu être récupéré, pensez à placer la réaction 🪡 avant de mettre le fil`
        );
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
      await thread.send(
        `**${message.author.username}** 💬 *${globalDate} à ${hour}* \n${message.content}\n\n----------\n\n`
      );
      message.delete();
    } catch (error) {
      console.error(error);
    }
  },
};
