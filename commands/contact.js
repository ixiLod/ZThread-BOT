const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('contact')
    .setDescription('For contact bot creator'),
  async execute(interaction) {
    await interaction.reply(
      // Reply the name of the author of the bot
      {
        content: 'You can contact the bot creator on this discord account : ixiLod#7879',
        ephemeral: true,
      }
    );
  },
};
