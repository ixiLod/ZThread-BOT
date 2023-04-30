const { PermissionsBitField } = require('discord.js');
const { requiredPermission } = require('../config.json');

module.exports = {
  checkPermission: async (user, message) => {
    if (user.bot) return false;
    const member = await message.guild.members.fetch(user.id);
    if (!member.permissions.has(PermissionsBitField.Flags[requiredPermission])) return false;
    return true;
  },
};
