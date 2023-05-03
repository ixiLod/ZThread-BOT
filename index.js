const { GatewayIntentBits, Client, Partials, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config();

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

// Set map for guild permissions
client.guildPermissions = new Map();

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

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // Checks server name who add the bot
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name, guild.id);
  });
});

client.on('guildCreate', async (guild) => {
  // Get guild ID, user ID, and send a message to the user
  const guildId = guild.id;
  const user = await client.users.fetch(process.env.USERID);
  user.send(
    `${client.user.username} was added to this discord guild : ${guild.name} (ID: ${guildId}).`
  );
});

client.login(process.env.TOKEN);
