const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    // Set the name and description of the command
    .setName('contact')
    .setDescription("Pour contacter l'auteur du bot"),
  async execute(interaction) {
    await interaction.reply(
      // Reply the name of the author of the bot
      {
        content:
          "Vous pouvez contacter l'auteur du bot sur ce compte discord : ixiLod#7879",
        ephemeral: true,
      }
    );
  },
};
