const discord = require('discord.js')
const { MessageButton } = require("discord-buttons")



module.exports = {
    name: 'about',
    aliases: ['ab'],
    category: 'Infos',
    utilisation: '{prefix}about',

    execute: async (client, message, args) => {
        const embed = new discord.MessageEmbed()
        .setTitle("About Me")
        .setDescription("Trexy is a freemium discord bot with fast rendering speed with youtube support. All its features are free which are premium in other bots.")
        .setColor("BLUE")

        const support = new MessageButton()
        .setStyle("url")
        .setLabel('Our Support Server')
        .setID("smart")
        .setURL('https://discord.gg/ZX9JZFhhwU')

        const vote = new MessageButton()
        .setStyle("url")
        .setLabel("Vote Me")
        .setID("voter")
        .setURL('https://top.gg/bot/757656073657253929')

        message.channel.send("Oh, You found something cool :tada:", {
          buttons: [support, vote],
          embed: embed
          
        })
    },
};