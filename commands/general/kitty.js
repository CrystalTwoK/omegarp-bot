const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kitty")
    .setDescription("Sends a random kitty photo!"),
  async execute(interaction) {
    try {
      embedMessage.kitty(interaction);
    } catch (e) {
      console.log(log.error + " [kitty.js/execute()]" + e);
    }
  },
};
