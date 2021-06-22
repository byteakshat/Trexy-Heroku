const { ShardingManager } = require("discord.js");
const config = require('./config/bot.js')

const shards = new ShardingManager("./index.js", {
  token: client.config.discord.token,
  totalShards: "auto"
});

shards.on("shardCreate", async (shard) => {
  console.log(`[${new Date().toString.split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.spawn(shards.totalShards, 10000);
