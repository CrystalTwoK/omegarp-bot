const { SlashCommandBuilder } = require("@discordjs/builders");
const { sendGiveaway } = require("../../db/giveaway");
const embedMessage = require("../../discord/embedMessage");

//CREA IL TEMPLATE DEL GIVEAWAY RICHIAMANDO L'INSERIMENTO NEL DATABASE

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendgiveaway")
    .setDescription("Invia un Giveaway")
    .addStringOption((option) =>
      option
        .setName("seleziona")
        .setDescription("Seleziona il Giveaway da inviare")
        .setRequired(true)
        .addChoices(...giveawayArray)
    ),

  async execute(interaction) {
    const choice = interaction.options.get("seleziona").value;

    sendGiveaway(interaction, choice);

    embedMessage.reply(
      interaction,
      "#00ff00",
      "Modello Giveaway inviato con successo",
      "Attendi qualche minuto prima di inviare il Giveaway. \nNel caso la lista dei giveaway non dovesse aggiornarsi, prova a chiudere e riaprire Discord."
    );
  },
};
