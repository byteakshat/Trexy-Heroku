module.exports = {
    name: 'debug',
    aliases: ['db'],
    category: 'Infos',
    utilisation: '{prefix}debug',

    execute(client, message) {
        message.channel.send(`${client.emotes.success} - ${client.user.username} is currently connected in **${client.voice.connections.size}** channels !`);
    },
};