const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendplay")
    .setDescription("Send the Play Button."),
  async execute(interaction) {
    try {
      embedMessage.reply(interaction, "#00ff00", "Messaggio 'GIOCA' inviato.");
      embedMessage.play(
        interaction,
        "ENTRA NEL SERVER",
        "__*Clicca sul bottone per effettuare l'accesso al server di OMEGA RP.*__"
      );
    } catch (e) {
      console.log(log.error + " [sendverify.js/execute()]" + e);
    }
  },
};
