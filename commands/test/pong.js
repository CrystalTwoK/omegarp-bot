const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pong")
    .setDescription("Test Command [pong]"),
  async execute(interaction) {
    embedMessage.reply(interaction, "#00ff84", "Test Reply: Ping");
  },
};
