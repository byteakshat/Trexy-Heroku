const fs = require('fs');
const discord = require('discord.js');
const myID = '731420164628676640' 
const db = require('quick.db')
const path = require("path");

const client = new discord.Client({ disableMentions: 'everyone' });
 require('discord-buttons')(client);

const keepAlive = require('./server.js');
const { Player } = require('discord-player');

client.player = new Player(client,
{ leaveOnEndCooldown: 20000000,
 leaveOnEnd: false, 
leaveOnEmpty: false,
enableLive: true,
autoSelfDeaf: false,
leaveOnEmptyCooldown: 20000000,
ytdlDownloadOptions: {
        requestOptions: {
            headers: {
                cookie: "AIzaSyAzdrs-CuiepXYhf_ze1RAA2PFbXBAJm7I"
            }
        }
}
    });
client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

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

client.on('message', async message => {
    if (message.author.bot) return;
 
   const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

 if (command === ',bug') {
        const person = message.author.username
        const userID = message.author.id

        if (userID == lockedList) {
            message.channel.send('***You have abused this feature before and as such have been put on a blacklist***')
        } else {
            let bug = args.slice(0).join(' ');
            
            if (!bug) {
                message.channel.send('You are attempting to send a bug report without listing a bug!')
            } else {
                client.fetchUser(myID).then((user) => {
                    user.send(`${person} of ${message.guild.name} (Guild ID: ${message.guild.id}, User ID: ${userID}) reported the bug: ${bug}`);
                });
                message.channel.send('**Your bug was reported. If you abuse this feature you will be put on a blacklist and will be prevented from using this command.**');
            };
        };
    };
});

client.login(client.config.discord.token);
