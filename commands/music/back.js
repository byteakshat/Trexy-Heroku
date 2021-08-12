const Discord = require("discord.js");

module.exports = {
  name: "back",
  aliases: ['b'],
  category: 'Music',
  utilisation: '{prefix}back',
  description: "Plays the previous song",
  execute: async (client, message, args, data) => {
        
		const queue = client.player.getQueue(message);

		const voice = message.member.voice.channel;
		if (!voice){
			return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);
		}

		if(!queue){
			return message.channel.send(`${client.emotes.error} - There's no music playing`);
		}

		if(!queue.previousTracks[0]){
			return message.channel.send(`${client.emotes.error} - There's no music playing before current one`);
		}

		const members = voice.members.filter((m) => !m.user.bot);

		const embed = new Discord.MessageEmbed()
			.setAuthor("BACK COMMAND EXECUTION")
			.setThumbnail(queue.tracks[0].thumbnail)
			.setFooter("TREXY")
			.setColor('#0000FF');

		const m = await message.channel.send(embed);

		if(members.size > 1){
            
			m.react("👍");

			const mustVote = Math.floor(members.size/2+1);

			embed.setDescription(message.translate("music/back:VOTE_CONTENT", {
				songName: queue.tracks[0].name,
				voteCount: 0,
				requiredCount: mustVote
			}));
			m.edit({ embeds: [embed] });
    
			const filter = (reaction, user) => {
				const member = message.guild.members.cache.get(user.id);
				const voiceChannel = member.voice.channel;
				if(voiceChannel){
					return voiceChannel.id === voice.id;
				}
			};

			const collector = await m.createReactionCollector(filter, {
				time: 25000
			});

			collector.on("collect", (reaction) => {
				const haveVoted = reaction.count-1;
				if(haveVoted >= mustVote){
					this.client.player.back(message);
					embed.setDescription(message.translate(`${client.emotes.success}`));
					m.edit(embed);
					collector.stop(true);
				} else {
					embed.setDescription(message.translate(`${client.emotes.music}`, {
						songName: queue.tracks[0].title,
						voteCount: haveVoted,
						requiredCount: mustVote
					}));
					m.edit(embed);
				}
			});

			collector.on("end", (collected, isDone) => {
				if(!isDone){
					return message.channel.send("misc:TIMES_UP");
				}
			});

		} else {
			client.player.back(message);
			embed.setDescription(message.translate(`${client.emotes.success}`));
			m.edit(embed);
		}
        
	}

}
