const { ShardingManager } = require("discord.js")
const { token } = "NzU3NjU2MDczNjU3MjUzOTI5.X2jkNA.i0d2428KsjkbEtp6x_QCT8gBigI"

const manager = new ShardingManager("./bot.js", {
  token,
  totalShards: 5
});

manager.spawn();
manager.on("shardCreate", shard => console.log(`Shard #${shard.id} is online.`));
