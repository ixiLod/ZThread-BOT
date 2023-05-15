const { EmbedBuilder } = require('discord.js');

module.exports = {
  attachmentsFiles: async (message) => {
    const files = [];
    if (message.attachments.size > 0) {
      message.attachments.forEach((attachment) => {
        const attachedFile = new EmbedBuilder()
          .setImage(attachment.url)
          .setDescription(`Attached file : [${attachment.name}](${attachment.url})`);
        files.push(attachedFile);
      });
    }
    return files;
  },
};
