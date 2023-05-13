const { checkPermission } = require('../helpers/permissionCheck');
const { supabase } = require('../helpers/supabaseClient');
const { errorMessage } = require('../helpers/errorMessage');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    if (reaction.emoji.name !== '🪡') return;
    const message = reaction.message;
    const guildId = message.guild.id;

    const hasPermission = await checkPermission(user, message);
    if (!hasPermission) return;

    // Return if channel is a forum or a DM
    if (!message.channel.guild) return;
    if (message.channel.parent?.type === 'GUILD_CATEGORY') return;

    // Remove old thread ID from the database
    await supabase.from('guild_threads').delete().eq('guild_id', guildId);

    // If the message is already a thread, save the thread ID in the database
    if (message.thread) {
      await supabase.from('guild_threads').insert([{ guild_id: guildId, thread_id: message.id }]);
      return;
    } else {
      try {
        // Create a new thread
        const newThread = await message.startThread({
          name: `Thread edited with ${client.user.username}`,
          autoArchiveDuration: 60,
          reason: 'New thread created',
        });
        // Save thread ID in the database
        await supabase
          .from('guild_threads')
          .insert([{ guild_id: guildId, thread_id: newThread.id }]);
      } catch (error) {
        console.error('Could not start thread:', error);
        message.channel.send(errorMessage);
      }
    }
  },
};
