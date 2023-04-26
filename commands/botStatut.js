const { SlashCommandBuilder } = require('discord.js');
let { requiredPermission } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('statut')
    .setDescription('Pour savoir si le bot est en mode admin ou everyone.'),

  async execute(interaction) {
    let status = null;
    // If the bot is in admin mode, status is admin, if not, status is everyone
    requiredPermission[0] === "Administrator" ? (status = 'admin') : (status = 'everyone');

    await interaction.reply({
      content: `Le bot est actuellement en mode ${status}.`,
      ephemeral: true,
    });
  },
};
