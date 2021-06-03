module.exports = async (client) => {
    console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users, with total of ${client.channels.cache.size} channels , with ${client.commands.size} commands!`);
    console.log(`Thank you for making me @Proboy#9999 and @Vex[R]#0001`);
    client.user.setStatus('idle');
   client.user.setActivity(',help', { type: "LISTENING" })
};
