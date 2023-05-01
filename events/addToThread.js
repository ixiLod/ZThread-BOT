const { checkPermission } = require('../helpers/permissionCheck');
const { supabase } = require('../helpers/supabaseClient');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    if (reaction.emoji.name !== '🧵') return;
    const message = reaction.message;
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
        `${user.username}, le message cible n'a pas pu être récupéré, pensez à placer la réaction 🪡 avant de mettre le fil`
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
      // Set date, send the message in the thread and delete the original message
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
      await thread.send(
        `**${message.author.username}** 💬 *${globalDate} à ${hour}* \n${message.content}\n\n----------\n\n`
      );
      message.delete();
    } catch (error) {
      console.error(error);
      message.channel.send(
        "La réaction 🧵 fonctionne uniquement sur les messages postés après mon arrivée sur le serveur. N'hésitez pas à utiliser cette réaction sur les messages plus récents"
      );
    }
  },
};
