const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('status')
    .setDescription('To know if the bot is in admin or everyone mode.'),

  async execute(interaction) {
    let status = null;
    const guildId = interaction.guild.id;
    const permission = interaction.client.guildPermissions.get(guildId);

    // If the bot is in admin mode, status is admin, if not, status is everyone
    if (permission === 'Administrator') {
      status = 'admin';
    } else if (permission === 'AddReactions') {
      status = 'everyone';
    } else {
      status = 'admin';
    }

    await interaction.reply({
      content: `The bot is currently in ${status} mode.`,
      ephemeral: true,
    });
  },
};
