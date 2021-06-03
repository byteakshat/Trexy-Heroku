var str = 'abcdefghijkl';
console.log(str.match(/.{1,2000}/g));

const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
            
module.exports = {
    name: 'lyrics',
    aliases: ['ly'],
    category: 'Music',
    utilisation: '{prefix}lyrics',
    description: 'Lyrics Command for the Music',
    usage: `{prefix}lyrics`,
    execute: async (client, message, args) => {

        const queue = client.player.getQueue(message);
    if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.playing.title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.playing.title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs.title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle("Lyrics")
      .setDescription(lyrics)
      .setColor("#eb7434")
      .setFooter("Library Used - Lyrics-Finder")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};