const { MessageEmbed } = require("discord.js")
const ms = require("ms")

module.exports = {
  name: 'stats',
  aliases: ['st'],
  description: 'Get the detailed information of bot',
  category: 'Infos',
  utilisation: '{prefix}stats',
  execute(client, message, args) {
    let embed = new MessageEmbed()
    .setColor('#0000FF')
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor(`TREXY STATS`, client.user.displayAvatarURL())
    .setDescription(`**${client.user.username}** A Freemium Music Bot`)
    .addField("SERVERS", client.guilds.cache.size, true)
    .addField("PRESENCE", client.user.presence.activities[0].name, true)
    .addField("ID", client.user.id, true)
    .addField("UPTIME", ms(client.uptime), true)
    .addField("STATUS", client.user.presence.status, true)
    .addField("TOTAL MEMBERS",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0), true)
    .addField("NO. OF GUILD IN BOT IS PLAYING", client.voice.connections.size, true)
    message.channel.send(embed)
  }
};