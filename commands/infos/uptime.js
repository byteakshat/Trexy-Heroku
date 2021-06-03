const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: 'uptime',
    aliases: ['up'],
    category: 'Infos',
    utilisation: '{prefix}uptime',

execute: async (client, message, args) => {
message.channel.send(`Uptime: ${prettyMilliseconds(client.uptime)}`)
}
}