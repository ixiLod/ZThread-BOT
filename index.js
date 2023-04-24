const { GatewayIntentBits, Client, Partials } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Retrieve all event files
const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));

// Charge all event files
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

// notification when the bot is ready
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);
