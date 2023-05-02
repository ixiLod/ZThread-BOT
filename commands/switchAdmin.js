const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('setadmin')
    .setDescription(
      "To restrict the use of the bot to administrators and moderators."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // Add Administrator in guildPermission map in index.js for switch to admin
    interaction.client.guildPermissions.set(interaction.guild.id, 'Administrator');

    await interaction.reply({
      content: `The bot is now restricted to administrators and moderators.`,
      ephemeral: true,
    });
  },
};
