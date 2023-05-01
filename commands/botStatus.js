const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('status')
    .setDescription('Pour savoir si le bot est en mode admin ou everyone.'),

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
      content: `Le bot est actuellement en mode ${status}.`,
      ephemeral: true,
    });
  },
};
