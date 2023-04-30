const { threadID } = require('../config.json');
const { checkPermission } = require('../helpers/permissionCheck');

module.exports = {
  name: 'messageReactionRemove',
  async execute(reaction, user) {
    if (reaction.emoji.name !== '🪡') return;
    const message = reaction.message;

    const hasPermission = await checkPermission(user, message);
    if (!hasPermission) return;

    if (message) {
      // empty the threadID array
      threadID.length = 0;
    }
  },
};
