const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("creaticket")
    .setDescription("Invia il Ticket Constructor")
    .addChannelOption((channel) => {
      return channel
        .setName("canale")
        .setDescription(
          "Seleziona il canale in cui inviare il Ticket Constructor"
        )
        .setRequired(true);
    }),
  async execute(interaction) {
    const selection = interaction.options.get("canale").value;
    const canale = interaction.guild.channels.cache.get(selection);
    embedMessage.ticketConstructor(interaction, canale);
  },
};
