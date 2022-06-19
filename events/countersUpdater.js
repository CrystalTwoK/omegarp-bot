const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const dbClient = new MongoClient(db);

const countersUpdater = async (guild) => {
  try {
    await dbClient.connect();
    const database = dbClient.db(`OMEGA_${guild.id}`);
    const counters = database.collection("OMEGA_Counters");

    //const
    await counters
      .find()
      .toArray()
      .then(async (results) => {
        for (const result of results) {
          let channel = client.channels.cache.get(result.channelId);
          const memberCount = guild.membersCount;
          channel.setName(`${result.label} ${memberCount}`);
          console.log(
            log.system + `Member Count Updated. (Guild ID: ${guild.id})`
          );
        }
      });
  } catch (e) {
    console.log(log.error + "[deploycounter.js/execute()] " + e);
  }
};

module.exports = { countersUpdater };
