const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const dbClient = new MongoClient(process.env.db);

const commandsInit = async (guildId) => {
  try {
    //Reset Global Variables
    global.choicesArray = [];
    global.giveawayArray = [];
    global.closedGiveawayArray = [];
    global.activeGiveawayArray = [];
    global.commands = [];
    await dbClient.connect();
    const database = dbClient.db(`OMEGA_${guildId}`);
    const giveaways = database.collection("OMEGA_Giveaways");

    //get all giveaways
    await giveaways
      .find({ isClosed: false, isActive: false })
      .toArray()
      .then((results) => {
        for (const record of results) {
          global.giveawayArray.push({
            name: record.name,
            value: record._id.toHexString(),
          });
        }
      });

    //get all closed giveaway
    await giveaways
      .find({ isClosed: true })
      .toArray()
      .then((results) => {
        for (const record of results) {
          global.closedGiveawayArray.push({
            name: record.name,
            value: record._id.toHexString(),
          });
        }
      });

    //get all active giveaways
    await giveaways
      .find({ isActive: true })
      .toArray()
      .then((results) => {
        for (const record of results) {
          global.activeGiveawayArray.push({
            name: record.name,
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
