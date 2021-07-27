const {Client, Message, MessageEmbed} = require("discord.js")

module.exports = {
    name: 'bug',
    category: 'Infos',
    description: 'You can report the bug for trexy',
    usage: `bug`,
    utilisation: '{prefix}bug',
/**
* @param {Client} client
*@param {Message} message
*@param {String[]} args
*/
 execute: async (client, message, args) => {

const receiver = client.user.cache.get("731420164628676640")

const query = args.join(" ")
if(!query) return message.channel.send(`usage: /`${prefix} <bug>/`.`)

const report = new MessageEmbed()
.setTitle("New Bug!")
.addField("author", message.author.toString(), true)
.addField("author id", message.author.id, true)
.addField("guild", message.guild.name, true)
.addField("guild id", message.guild.id, true)
.addField("bug", query)
receiver.send(report)
}
}
