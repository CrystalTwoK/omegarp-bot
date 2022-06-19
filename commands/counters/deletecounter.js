const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);
let ObjectId = require("mongodb").ObjectId;
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`deletecounter`)
    .setDescription("Delete a counter.")
    .addStringOption((option) =>
      option
        .setName("choosecounter")
        .setDescription("Select the counter to delete.")
        .setRequired(true)
        .addChoices(...countersArray)
    ),
  async execute(interaction) {
    try {
      //db
      await dbClient.connect();
      const database = dbClient.db(`OMEGA_${interaction.guild.id}`);
      const counters = database.collection("OMEGA_Counters");

      //const
      const id = interaction.options.get("choosecounter").value;
      const query = { _id: ObjectId(id) };

      counters
        .find(query)
        .toArray()
        .then(async (results) => {
          let channel = global.client.channels.cache.get(results[0].channelId);
          await channel.delete();
          counters.deleteOne(query, (e, obj) => {
            if (e)
              console.log(
                log.error +
                  "[deletecounter.js/execute()/counters/deleteOne()] " +
                  e
              );
            const { commandsInit } = require("../../events/commandsInit.js");
            commandsInit(interaction.guild.id);
            const embedMessage = require("../../discord/embedMessage");
            embedMessage.reply(interaction, "#00ff84", "Counter Deleted", "");
          });
        });
    } catch (e) {
      console.log(log.error + "[deletecounter/execute()] " + e);
    }
  },
};
