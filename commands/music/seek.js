const player = require('discord-player');


module.exports = {
  name: "seek",
  aliases: ['forward'],
  category: 'Music',
  utilisation: '{prefix}seek',
  description: "Forwards the song",
  execute: async (client, message, args) => {
		const queue = client.player.getQueue(message);

		const voice = message.member.voice.channel;
		if (!voice){
			return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);
		}

		if(!queue){
			return message.error(`${client.emotes.error} - There's no music playing`);
		}

		const time = ms(args[0]);
		if (isNaN(time)) {
			return message.error(`${client.emotes.error} - You've entered an invalid time duration , please recheck that again!`);
		}

		// Change the song position
		await client.player.setPosition(message, queue.currentStreamTime + time);
        
		// Send the embed in the current channel
		message.channel.send("You've seek the music successfully!");
	}

}
