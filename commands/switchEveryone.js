const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
let { requiredPermission } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('seteveryone')
    .setDescription(
      "Pour rendre l'utilisation du bot accessible à tout le monde."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Switch to everyone
    requiredPermission.length = 0;
    requiredPermission.push("AddReactions");

    await interaction.reply({
      content: `Le bot est maintenant accessible à tout le monde.`,
      ephemeral: true,
    });
  },
};
