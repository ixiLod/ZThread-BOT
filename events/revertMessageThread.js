const { checkPermission } = require('../helpers/permissionCheck');
const { attachmentsFiles } = require('../helpers/attachmentsFiles');
const { setDate } = require('../helpers/setDate');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (reaction.emoji.name !== '✂️') return;
    const message = await reaction.message.fetch();

    const hasPermission = await checkPermission(user, message);
    if (!hasPermission) return;

    if (!message.channel.isThread()) return;

    try {
      const { globalDate, hour } = await setDate(message);
      const files = attachmentsFiles(message);

      // Get parent channel and send message depending if is a bot or not
      const parent = await message.channel.parent.fetch();
      if (message.author.bot === false) {
        const sendMessage =
          files.length > 0
            ? {
                content: `**${message.author.username}** 💬 *${globalDate} at ${hour}* \n${message.content}---------- *this post was originally in a thread* ----------`,
                embeds: files,
              }
            : {
                content: `**${message.author.username}** 💬 *${globalDate} at ${hour}* \n${message.content}\n\n---------- *this post was originally in a thread* ----------\n\n`,
              };
        await parent.send(sendMessage);
      } else if (message.author.bot === true) {
        const sendMessage =
          files.length > 0
            ? {
                content: `${message.content} *this post was originally in a thread* ----------\n\n`,
                embeds: files,
              }
            : {
                content: `${message.content} *this post was originally in a thread* ----------\n\n`,
              };
        await parent.send(sendMessage);
      }
      message.delete();
    } catch (error) {
      console.error(error);
    }
  },
};
