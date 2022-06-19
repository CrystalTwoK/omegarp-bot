const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendverify")
    .setDescription("Send a verification message.")
    .addRoleOption((role) => {
      return role
        .setName("role")
        .setDescription("Select the role to assign.")
        .setRequired(true);
    }),
  async execute(interaction) {
    try {
      const ruolo = interaction.options.get("role").value;
      embedMessage.reply(interaction, "#fec814", ruolo);
    } catch (e) {
      console.log(log.error + " [sendverify.js/execute()]" + e);
    }
  },
};
