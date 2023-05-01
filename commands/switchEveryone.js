const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('seteveryone')
    .setDescription(
      "Pour rendre l'utilisation du bot accessible à tout le monde."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Add Addreaction in guildPermission map in index.js for switch to everyone
    interaction.client.guildPermissions.set(interaction.guild.id, 'AddReactions');

    await interaction.reply({
      content: `Le bot est maintenant accessible à tout le monde.`,
      ephemeral: true,
    });
  },
};
