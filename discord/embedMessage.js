const { MessageActionRow, MessageButton } = require("discord.js");
const Discord = require("discord.js");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const db = process.env.db;
const dbClient = new MongoClient(db);
let ObjectId = require("mongodb").ObjectId;
const axios = require("axios").default;

module.exports = {
  async faction(interaction) {
    try {
      //db
      await dbClient.connect();
      const database = dbClient.db(`OMEGA_${interaction.guild.id}`);
      const fazioni = database.collection("OMEGA_Factions");

      //const
      const id = interaction.options.get("sceglifazione").value;
      const query = { _id: ObjectId(id) };

      await fazioni
        .find(query)
        .toArray()
        .then((results) => {
          const result = results[0];

          const embed = new Discord.MessageEmbed()
            .setColor(result.color)
            .setTitle(result.title)
            .setDescription(result.description)
            .setThumbnail(result.thumbnail)
            .setImage(result.copertina)
            .setTimestamp()
            .setFooter({
              text: `© 2022 - OMEGA - ${result.faction}`,
              iconURL: `https://i.imgur.com/RyOd1TC.png`,
            });

          const factionButtons = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("addrole_" + result._id.toString())
              .setLabel(result.buttonlabel)
              .setEmoji(result.buttonemoji)
              .setStyle("SECONDARY"),
            new MessageButton()
              .setCustomId("removerole_" + result._id.toString())
              .setLabel("")
              .setEmoji("❌")
              .setStyle("SECONDARY")
          );
          interaction.reply({ embeds: [embed], components: [factionButtons] });
        });
    } catch (e) {
      console.log(log.error + "[embedMessage/faction()] " + e);
    }
  },
  async reply(interaction, color, title, description = "") {
    try {
      const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail("https://i.imgur.com/RyOd1TC.png")
        .setTimestamp()
        .setFooter({
          text: `© 2022 - OMEGA`,
          iconURL: `https://i.imgur.com/RyOd1TC.png`,
        });
      interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (e) {
      console.log(log.error + "[embedMessage/reply()] " + e);
    }
  },
  async send(channel, color, title, description, thumbnail, image) {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setDescription(description)
      .setThumbnail(thumbnail)
      .setImage(image)
      .setFooter({
        text: `© 2022 - OMEGA - System`,
        iconURL: `https://i.imgur.com/RyOd1TC.png`,
      });
    channel.send({ embeds: [embed] });
  },
  async kitty(interaction) {
    const url = "https://api.thecatapi.com/v1/images/search";
    let apiImage = "";

    await axios.get(url).then(async (res) => {
      apiImage = res.data[0].url;
      const embed = new Discord.MessageEmbed()
        .setColor("#fec814")
        .setTitle("Here is a cute kitty pic for you!")
        .setImage(apiImage)
        .setFooter({
          text: `© 2022 - OMEGA - System`,
          iconURL: `https://i.imgur.com/RyOd1TC.png`,
        });
      interaction.reply({ embeds: [embed] });
    });
  },
  async ticketConstructor(interaction, channel) {
    const embed = new Discord.MessageEmbed()
      .setColor("#fec814")
      .setTitle("APRI UN TICKET")
      .setDescription(
        "__Apri un ticket per parlare direttamente con lo Staff e ricevere supporto!__\n\n*I ticket che non seguiranno il modulo richiesto saranno automaticamente chiusi*"
      )
      .setThumbnail("https://i.imgur.com/RyOd1TC.png")
      .setTimestamp()
      .setFooter({
        text: `© 2022 - OMEGA - System`,
        iconURL: `https://i.imgur.com/RyOd1TC.png`,
      });

    const buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("permadeath")
          .setLabel("PERMADEATH")
          .setStyle("DANGER")
          .setEmoji("💀")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("tecnico")
          .setLabel("SUPPORTO TECNICO")
          .setStyle("SECONDARY")
          .setEmoji("🔧")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("generico")
          .setLabel("GENERICO")
          .setStyle("SECONDARY")
          .setEmoji("🌍")
      );

    interaction.reply({
      content: "Ticket Construction creato con successo!",
      ephemeral: true,
    });

    channel.send({ embeds: [embed], components: [buttons] });
  },
  async ticketCloser(interaction, channel) {
    const embed = new Discord.MessageEmbed()
      .setColor("#fec814")
      .setTitle(`Ciao ${interaction.user.username}!`)
      .setDescription(
        "Benvenuto all'interno del tuo Ticket. Compila il modulo di seguito ed uno staffer ti risponderà appena possibile. \n\n**Nome Steam:**\n**Link account Steam: **\n**Prove/Video (si/no):**\n**Descirivi nel dettaglio la tua richiesta:**"
      )
      .setThumbnail("https://i.imgur.com/RyOd1TC.png")
      .setFooter({
        text: `© 2022 - OMEGA - System`,
        iconURL: `https://i.imgur.com/RyOd1TC.png`,
      });

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("chiudi")
        .setLabel("CHIUDI TICKET")
        .setStyle("SECONDARY")
        .setEmoji("🔒")
    );
    channel.send({ embeds: [embed], components: [buttons] });
  },

  async ticketCloseConfirm(interaction) {
    const embed = new Discord.MessageEmbed()
      .setColor("#fec814")
      .setTitle(`Confermi di voler chiudere il Ticket?`)
      .setThumbnail("https://i.imgur.com/RyOd1TC.png")
      .setFooter({
        text: `© 2022 - OMEGA - System`,
        iconURL: `https://i.imgur.com/RyOd1TC.png`,
      });

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("conferma")
        .setLabel("CONFERMA CHIUSURA")
        .setStyle("SECONDARY")
        .setEmoji("🔒")
    );

    interaction.reply({
      embeds: [embed],
      components: [buttons],
      ephemeral: true,
    });
  },

  async pvt(interaction, titolo, descrizione) {
    const embed = new Discord.MessageEmbed()
      .setColor("#fec814")
      .setTitle(titolo)
      .setDescription(descrizione)
      .setThumbnail("https://i.imgur.com/RyOd1TC.png")
      .setFooter({
        text: `© 2022 - OMEGA - System`,
        iconURL: `https://i.imgur.com/RyOd1TC.png`,
      });

    await interaction.user.send({ embeds: [embed] });
  },
};
