const { checkPermission } = require('../helpers/permissionCheck');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (reaction.emoji.name !== '✂️') return;
    const message = reaction.message;

    const hasPermission = await checkPermission(user, message);
    if (!hasPermission) return;

    if (!message.channel.isThread()) return;

    try {
      // Send the message in the parent thread
      const parent = await message.channel.parent.fetch();
      // if message send from an user
      if (message.author.bot === false) {
        const date = message.createdAt.toLocaleString('en-EN', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        });
        const hour = message.createdAt.toLocaleTimeString('en-EN', {
          hour: '2-digit',
          minute: '2-digit',
        });
        await parent.send(
          `**${message.author.username}** 💬 *${date} at ${hour}* \n${message.content}\n\n---------- *this post was originally in a thread* ----------\n\n`
        );
        // if message send from the bot
      } else if (message.author.client) {
        await parent.send(
          `${message.content} *this post was originally in a thread* ----------\n\n`
        );
      }
      message.delete();
    } catch (error) {
      console.error(error);
    }
  },
};
