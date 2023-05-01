const { PermissionsBitField } = require('discord.js');

module.exports = {
  checkPermission: async (user, message) => {
    if (user.bot) return false;

    const member = await message.guild.members.fetch(user.id);
    // Get guildPermission map in index.js, or set default to 'Administrator'
    const requiredPermission =
      message.client.guildPermissions.get(message.guild.id) || 'Administrator';
    if (!member.permissions.has(PermissionsBitField.Flags[requiredPermission])) return false;
    return true;
  },
};
