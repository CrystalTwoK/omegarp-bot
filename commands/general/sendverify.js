const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendverify")
    .setDescription("Send a verification message."),
  async execute(interaction) {
    try {
      embedMessage.reply(
        interaction,
        "#00ff00",
        "Messaggio di verifica utenti inviato."
      );
      embedMessage.verify(
        interaction,
        "VERIFICA ACCOUNT",
        "__*Clicca sul bottone per effettuare la verifica del tuo account e accedere al Regolamento Discord di OMEGA RP.*__"
      );
    } catch (e) {
      console.log(log.error + " [sendverify.js/execute()]" + e);
    }
  },
};
