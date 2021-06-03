const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: ['inv', 'Support'],
    category: 'Infos',
    utilisation: '{prefix}invite',

    execute(client, message, args) {
             const invEmbed = new MessageEmbed()
        .setColor('#0000FF')
        .setTitle("Want to Invite Me to your house?")
        .setDescription([
            `[Invite Link | Vibe with Me 🥳🎉](https://discord.com/api/oauth2/authorize?client_id=757656073657253929&permissions=2150940768&scope=bot)`
        ])
  

        .setFooter(`Requested by ${message.member.user.tag}`)
        message.channel.send(invEmbed)
    }
}