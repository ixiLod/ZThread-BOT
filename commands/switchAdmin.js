const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
let { requiredPermission } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('setadmin')
    .setDescription(
      "Pour restreindre l'utilisation du bot aux administrateurs et modérateurs."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Switch to admin only
    requiredPermission.length = 0;
    requiredPermission.push("Administrator");

    await interaction.reply({
      content: `Le bot est maintenant restreint aux admninistrateurs et modérateurs.`,
      ephemeral: true,
    });
  },
};
