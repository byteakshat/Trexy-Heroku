
const { Util } = require("discord-player");

module.exports = {
    name: 'play',
    aliases: ['join', 'play', 'p'],
    category: 'Music',
    utilisation: '{prefix}play [name/URL]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Please indicate the title of a song !`);

        const tracks = await Util.ytSearch(args.join(" "), {
    user: message.author,
    player: client.player
}).catch(() => {});
        
        client.player.play(message, tracks[0].url, { firstResult: true });
    },
}
