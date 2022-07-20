const { SlashCommandBuilder } = require("@discordjs/builders");
const { sendGiveaway } = require("../../db/giveaway");
const { partecipantiGiveaway } = require("../../discord/embedMessage");
const embedMessage = require("../../discord/embedMessage");

//CREA IL TEMPLATE DEL GIVEAWAY RICHIAMANDO L'INSERIMENTO NEL DATABASE

module.exports = {
  data: new SlashCommandBuilder()
    .setName("partecipantigiveaway")
    .setDescription(
      "Prendi da lista di tutti i partecipanti ad uno specifico giveaway."
    )
    .addStringOption((option) =>
      option
        .setName("seleziona")
        .setDescription("Seleziona il Giveaway da controllare")
        .setRequired(true)
        .addChoices(...activeGiveawayArray)
    ),

  async execute(interaction) {
    const choice = interaction.options.get("seleziona").value;

    partecipantiGiveaway(interaction, choice);
  },
};
