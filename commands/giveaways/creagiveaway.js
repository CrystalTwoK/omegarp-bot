const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");
const { insertGiveaway } = require("../../db/giveaway");

//CREA IL TEMPLATE DEL GIVEAWAY RICHIAMANDO L'INSERIMENTO NEL DATABASE

module.exports = {
  data: new SlashCommandBuilder()
    .setName("creagiveaway")
    .setDescription("Crea un giveaway")
    .addStringOption((option) =>
      option
        .setName("nomegiveaway")
        .setDescription("Inserisci il nome da assegnare al modello di Giveaway")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("titolo")
        .setDescription(
          "Inserisci il titolo da far apparire sull'embed del Giveaway."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("descrizione")
        .setDescription(
          "Inserisci la descrizione da far apparire sull'embed del Giveaway."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription(
          "Inserisci l'emoji da utilizzare come reazione per far unire gli utenti al Giveaway."
        )
        .setRequired(true)
    ),

  async execute(interaction) {
    const nome = interaction.options.get("nomegiveaway").value;
    const titolo = interaction.options.get("titolo").value;
    const descrizione = interaction.options.get("descrizione").value;
    const emoji = interaction.options.get("emoji").value;

    insertGiveaway(
      interaction,
      interaction.user.id,
      nome,
      titolo,
      descrizione,
      emoji
    );

    embedMessage.reply(
      interaction,
      "#00ff00",
      "Modello Giveaway creato con successo",
      "Attendi qualche minuto prima di inviare il Giveaway. \nNel caso la lista dei giveaway non dovesse aggiornarsi, prova a chiudere e riaprire Discord."
    );
  },
};
