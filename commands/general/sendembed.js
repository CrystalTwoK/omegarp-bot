const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendembed")
    .setDescription("Send an Embed message.")
    .addStringOption((option) =>
      option.setName("title").setDescription("Embed title.").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("color").setDescription("Embed color.").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Embed description.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("thumbnail")
        .setDescription("Embed thumbnail.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("image").setDescription("Embed image.").setRequired(true)
    ),
  async execute(interaction) {
    try {
      embedMessage.reply(interaction, "#00ff84", "Embed Message Created.");

      let color = interaction.options.get("color").valu;
      let title = interaction.options.get("title").value;
      let description = interaction.options.get("description").value;
      let thumbnail = interaction.options.get("thumbnail").value;
      let image = interaction.options.get("image").value;
      console.log(
        `${color}\n${title}\n${description}\n${thumbnail}\n${image}\n`
      );
      embedMessage.send(
        interaction.channel,
        color,
        title,
        description,
        thumbnail,
        image
      );
    } catch (e) {
      console.log(log.error + " [sendembed.js/execute()] " + e);
    }
  },
};
