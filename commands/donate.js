const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('donate')
    .setDescription('You can support the creator of this bot by buying him a coffee.'),
  async execute(interaction) {
    // Reply the link to the buyMeACoffee page
    await interaction.reply({
      content:
        "To support the creator, it's happening here : https://www.buymeacoffee.com/vrh9ft859hx Thanks a lot !",
      ephemeral: true,
    });
  },
};
