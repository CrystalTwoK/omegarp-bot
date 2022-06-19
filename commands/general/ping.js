const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test Command"),
  async execute(interaction) {
    embedMessage.reply(interaction, "#00ff84", "Test Reply: Pong");
  },
};
