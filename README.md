# ZThread-BOT 

![thethread](https://user-images.githubusercontent.com/51421090/234418436-484e4361-b976-4c39-8f4b-70257059e56b.png)

is a simple way to reorganize your discord channels in threads, it takes place in 2 steps :

**1 - Put the reaction 🪡 on a message to start a thread.** 

**2 - Put the reaction 🧵 on the message you want to add to the thread
(doesn't work for messages posted before the bot was added)**. 

Optional : - Use the reaction ✂️ to output text from the thread and send it to the parent channel

## How to use 

Set the `config.json` file for add your ID and your token

Run the command `node index.js` for start the bot. 

Run the command `node deploy-commands.js` to deploy slash commands. 

## Slash Commands

**/setadmin** => *To restrict bot actions to administrators*. 

**/seteveryone** => *To make bot actions open to everyone*

## Dependencies 

[discord.js](https://discord.js.org/#/) : A library for interacting with the Discord API. 
