const { threadID } = require('../config.json');

module.exports = {
  name: 'messageReactionRemove',
  async execute(reaction, user) {
    // return if user is bot
    if (user.bot) return;
    // return if reaction is not 🪡
    if (reaction.emoji.name !== '🪡') return;
    // focus on the reaction message
    const message = reaction.message;
    if (message) {
      // empty the threadID array
      threadID.length = 0;
    }
  },
};
