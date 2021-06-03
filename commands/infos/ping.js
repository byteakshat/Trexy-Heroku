const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'Infos',
    description: 'RetIurns bot and API latency in milliseconds.',
    usage: `ping`,
    utilisation: '{prefix}ping',
    execute: async (client, message, args) => {
        	message.react('🏓')
        const msg = await message.channel.send('🏓 Pinging, Hold up...').then(m => m.delete({timeout: 300}));

        const embed = new MessageEmbed()
        .setColor('#0000FF')
        .setTitle('🏓 Pong!')
        .setThumbnail("https://github.com/SudhanPlayz/Discord-MusicBot/blob/master/assets/logo.gif?raw=true")
        .setDescription(`Bot Latency is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI Latency is **${Math.round(client.ws.ping)} ms**`)
        .setFooter(`Requested by ${message.member.user.tag}`);


        message.channel.send(embed);
    }
}
