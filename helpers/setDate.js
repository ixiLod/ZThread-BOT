module.exports = {
  setDate: async (message) => {
    const date = message.createdAt;
    const globalDate = date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      timeZone: 'Europe/Paris',
    });
    const hour = date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
    });

    return { globalDate, hour };
  },
};
