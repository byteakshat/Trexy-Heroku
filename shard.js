const {ShardingManager} = require('discord.js');
const config = require('./config/bot.js');
const manager = new ShardingManager("./index.js", {
  token: client.config.discord.token
  totalShards: "2"
});

manager.on("shardCreate", async (shard) => {
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #$(shard.id)`);
});

manager.spawn();