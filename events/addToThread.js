const { checkPermission } = require('../helpers/permissionCheck');
const { attachmentsFiles } = require('../helpers/attachmentsFiles');
const { setDate } = require('../helpers/setDate');
const { supabase } = require('../helpers/supabaseClient');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (reaction.emoji.name !== '🧵') return;
    const message = await reaction.message.fetch();
    const guildId = message.guild.id;

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
      const { globalDate, hour } = await setDate(message);
      const files = attachmentsFiles(message);

      // Set message, depending on whether it contains a file
      const sendMessage =
        files.length > 0
          ? {
              content: `**${message.author.username}** 💬 *${globalDate} at ${hour}* \n${message.content}`,
              embeds: files,
            }
          : {
              content: `**${message.author.username}** 💬 *${globalDate} at ${hour}* \n${message.content}\n\n----------\n\n`,
            };
      // Send message to thread and delete the original message
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
