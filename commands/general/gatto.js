const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gatto")
    .setDescription("Invia una foto casuale di un gatto"),
  async execute(interaction) {
    try {
      embedMessage.kitty(interaction);
    } catch (e) {
      console.log(log.error + " [gatto.js/execute()]" + e);
    }
  },
};
