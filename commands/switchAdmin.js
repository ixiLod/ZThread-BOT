const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('setadmin')
    .setDescription(
      "Pour restreindre l'utilisation du bot aux administrateurs et modérateurs."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Add Administrator in guildPermission map in index.js for switch to admin
    interaction.client.guildPermissions.set(interaction.guild.id, 'Administrator');

    await interaction.reply({
      content: `Le bot est maintenant restreint aux admninistrateurs et modérateurs.`,
      ephemeral: true,
    });
  },
};
