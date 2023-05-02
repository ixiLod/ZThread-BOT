const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('seteveryone')
    .setDescription(
      "To make the use of the bot accessible to everyone."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Add Addreaction in guildPermission map in index.js for switch to everyone
    interaction.client.guildPermissions.set(interaction.guild.id, 'AddReactions');

    await interaction.reply({
      content: `The bot is now accessible to everyone.`,
      ephemeral: true,
    });
  },
};
