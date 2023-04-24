module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    // Return if user is bot
    if (user.bot) return;
    // Return if reaction is not ✂️
    if (reaction.emoji.name !== '✂️') return;
    // Focus on the reaction message
    const message = reaction.message;
    // Return if channel is not a thread
    if (!message.channel.isThread()) return;
    try {
      // Send the message in the parent thread
      const parent = await message.channel.parent.fetch();
      // if message send from an user
      if (message.author.bot === false) {
        const date = message.createdAt.toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        });
        const hour = message.createdAt.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        });
        // send message in parent thread
        await parent.send(
          `**${message.author.username}** 💬 *${date} à ${hour}* \n${message.content}\n\n---------- *ce message était initialement dans un thread* ----------\n\n`
        );
      } else if (message.author.bot) {
        await parent.send(
          `${message.content} *ce message était initialement dans un thread* ----------\n\n`
        );
      }
      message.delete();
    } catch (error) {
      console.error(error);
    }
  },
};
