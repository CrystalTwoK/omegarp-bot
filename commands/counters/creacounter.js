const { SlashCommandBuilder } = require("@discordjs/builders");
const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("creacounter")
    .setDescription("Inserisci nel database il counter che vuoi creare")
    .addStringOption((option) =>
      option
        .setName("nomecanale")
        .setDescription("Inserisci il nome che vuoi assegnare al canale")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("selezionacanale")
        .setDescription("Seleziona il canale che vuoi utilizzare come counter")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      //db
      await dbClient.connect();
      const database = dbClient.db(`OMEGA_${interaction.guild.id}`);
      const counters = database.collection("OMEGA_Counters");
      const server = interaction.guild;

      //const
      const label = interaction.options.get("channelname").value;
      const role = interaction.options.get("role").value;

      server.channels
        .create(label, { type: "GUILD_VOICE" })
        .then(async (channel) => {
          const everyone = server.roles.everyone.id;

          channel.permissionOverwrites.set([
            {
              id: everyone,
              allow: ["VIEW_CHANNEL"],
              deny: ["CONNECT"],
            },
          ]);

          const info = {
            channelId: channel.id,
            label: label,
            role: role,
            isActive: true,
          };

          await counters.insertOne(info).then(async () => {
            console.log(log.db + "Counter created " + info.label);
            const { commandsInit } = require("../../events/commandsInit.js");
            await commandsInit(server);
            const embedMessage = require("../../discord/embedMessage.js");
            embedMessage.reply(interaction, "#00ff84", "Counter Created", "");
          });
        });
    } catch (e) {
      console.log(log.error + "[createcounter.js/execute()] " + e);
    }
  },
};
