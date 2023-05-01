const { checkPermission } = require('../helpers/permissionCheck');
const { supabase } = require('../helpers/supabaseClient');

module.exports = {
  name: 'messageReactionRemove',
  async execute(reaction, user) {
    if (reaction.emoji.name !== '🪡') return;
    const message = reaction.message;
    const guildId = message.guild.id;

    const hasPermission = await checkPermission(user, message);
    if (!hasPermission) return;

    if (message) {
      // Delete the thread id in the database
      const { data, error } = await supabase
        .from('guild_threads')
        .delete()
        .eq('guild_id', guildId)
        .eq('thread_id', message.id);

      if (error) {
        console.error('Error removing thread ID from database:', error);
      }
    }
  },
};
