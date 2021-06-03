const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  category: 'Music',
  utilisation: '{prefix}queue',
  description: "Get all the song name which are in queue",
  execute: (client, message, args) => {
    let embed = new MessageEmbed().setColor('#0000FF');
    
    if (!message.member.voice.channel) {
      embed.setAuthor("You're not in a voice channel !");
      return message.channel.send(embed);
    }
    
       if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message)) {
      embed.setAuthor("There is nothing in the queue");
      return message.channel.send(embed);
    }

    embed.setDescription
    (`**COMING UP NEXT AFTER 1.**
 ${queue.tracks
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`)

        embed.setFooter(`REQUESTED BY - ${message.member.user.tag}`)

      { split: true }

    embed.setThumbnail(message.guild.iconURL())
    embed.setTitle(`Server - ${message.guild.name}`)
    message.channel.send(embed);
  }
};