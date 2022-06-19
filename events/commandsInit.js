const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);

const commandsInit = async (guildId) => {
  try {
    //Reset Global Variables
    global.choicesArray = [];
    global.countersArray = [];
    global.commands = [];
    await dbClient.connect();
    const database = dbClient.db(`OMEGA_${guildId}`);
    const factions = database.collection("OMEGA_Factions");
    const counters = database.collection("OMEGA_Counters");

    await factions
      .find()
      .toArray()
      .then((results) => {
        for (const record of results) {
          global.choicesArray.push({
            name: record.faction,
            value: record._id.toHexString(),
          });
        }
      });

    await counters
      .find()
      .toArray()
      .then((results) => {
        for (const record of results) {
          global.countersArray.push({
            name: record.label,
            value: record._id.toHexString(),
          });
        }
      });

    const { commandsRefresh } = require("./commandsRefresh");
    commandsRefresh();
  } catch (e) {
    console.log(log.error + "[commandsInit.js/commandsInit()] " + e);
  }
};
module.exports = { commandsInit };
