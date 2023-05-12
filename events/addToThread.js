const { EmbedBuilder } = require('discord.js');
const { checkPermission } = require('../helpers/permissionCheck');
const { supabase } = require('../helpers/supabaseClient');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (reaction.emoji.name !== '🧵') return;
    const message = await reaction.message.fetch();
    const guildId = message.guild.id;

    // Check if user is a bot and if user have the required permission
    const hasPermission = await checkPermission(user, message);
    if (!hasPermission) return;

    // Return if channel is a thread, a forum or a DM, or message has the same ID
    if (message.channel.isThread()) return;
    if (!message.channel.guild) return;
    if (message.channel.parent?.type === 'GUILD_CATEGORY') return;

    // Get the thread ID from the database
    const { data, error } = await supabase
      .from('guild_threads')
      .select('thread_id')
      .eq('guild_id', guildId);
    if (error) {
      console.error('Error getting thread ID from database:', error);
    }

    // Check data and return if no thread ID is found
    if (!data || data.length === 0) {
      message.channel.send(
        `${user.username}, the target message could not be retrieved, consider placing the reaction 🪡 before putting the thread.`
      );
      return;
    }
    if (message.id === data[0].thread_id) return;

    // Get the thread from the ID and fetch it
    const threadChannel = message.guild.channels.cache.get(data[0].thread_id);
    const thread = await threadChannel.fetch();
    if (!thread) {
      console.error(`Thread was not found.`);
      return;
    }
    try {
      // Set date, check if message contains an image or other file, send the message in the thread and delete the original message
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

      const files = [];
      if (message.attachments.size > 0) {
        message.attachments.forEach((attachment) => {
          const attachedFile = new EmbedBuilder()
            .setImage(attachment.url)
            .setDescription(`Attached file : [${attachment.name}](${attachment.url})`);
          files.push(attachedFile);
        });
      }

      const sendMessage =
        files.length > 0
          ? {
              content: `**${message.author.username}** 💬 *${globalDate} at ${hour}* \n${message.content}\n\n----------\n\n`,
              embeds: files,
            }
          : {
              content: `**${message.author.username}** 💬 *${globalDate} at ${hour}* \n${message.content}\n\n----------\n\n`,
            };

      await thread.send(sendMessage);
      message.delete();
    } catch (error) {
      console.error(error);
      message.channel.send(
        "🤖 There was a problem, but don't worry, my developer will check what happened and fix it 🙏"
      );
    }
  },
};
