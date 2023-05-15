module.exports = {
  setDate: (message) => {
    const date = new Date(message.createdTimestamp);
    const globalDate = date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    const hour = date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return { globalDate, hour };
  },
};
