const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('donate')
    .setDescription(
      'Vous pouvez soutenir le créateur du bot en lui payant un café !'
    ),
  async execute(interaction) {
    // Reply the link to the buyMeACoffee page
    await interaction.reply({
      content:
        'Pour soutenir le créateur, ça se passe ici : https://www.buymeacoffee.com/vrh9ft859hx Merci Beaucoup !',
      ephemeral: true,
    });
  },
};
