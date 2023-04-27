const { GatewayIntentBits, Client, Partials, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('node:path');

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
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

// Charge all event files
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

// Reading commands files
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// notification when the bot is ready
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // Checks server name who add the bot
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
  });
});

client.login(token);
