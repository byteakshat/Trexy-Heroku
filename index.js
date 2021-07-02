const fs = require('fs');
const discord = require('discord.js');
const db = require('quick.db')
const path = require("path");

const client = new discord.Client({ disableMentions: 'everyone' });
 require('discord-buttons')(client);

const keepAlive = require('./server.js');
const { Player } = require('discord-player');

client.player = new Player(client,
{ leaveOnEnd: false, 
leaveOnEmpty: false,
enableLive: true,
autoSelfDeaf: false,
ytdlDownloadOptions: {
        requestOptions: {
            headers: {
                cookie: "AIzaSyAzdrs-CuiepXYhf_ze1RAA2PFbXBAJm7I"
            }
        }
}
    });
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
 
 client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let PREFIX = db.get(`prefix_${message.guild.id}`)
  if(!PREFIX) PREFIX = client.config.discord.prefix;
  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  }
 }
           });
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
        

keepAlive();
client.login(client.config.discord.token);
