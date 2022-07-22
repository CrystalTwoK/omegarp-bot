const { MessageActionRow, MessageButton } = require("discord.js");
const Discord = require("discord.js");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const db = process.env.db;
const dbClient = new MongoClient(db);
let ObjectId = require("mongodb").ObjectId;
const axios = require("axios").default;
const { commandsInit } = require("../events/commandsInit");

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
        .setTitle("Ecco a te la foto di un gatto!")
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

  async verify(interaction, titolo, descrizione) {
    const embed = new Discord.MessageEmbed()
      .setColor("#fec814")
      .setTitle(titolo)
      .setDescription(descrizione)
      .setThumbnail("https://i.imgur.com/RyOd1TC.png")
      .setFooter({
        text: `© 2022 - OMEGA - System`,
        iconURL: `https://i.imgur.com/RyOd1TC.png`,
      });

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("verifica")
        .setLabel("VERIFICA")
        .setStyle("SECONDARY")
        .setEmoji("✅")
    );

    await interaction.channel.send({ embeds: [embed], components: [button] });
  },

  async play(interaction, titolo, descrizione) {
    const embed = new Discord.MessageEmbed()
      .setColor("#fec814")
      .setTitle(titolo)
      .setDescription(descrizione)
      .setThumbnail("https://i.imgur.com/RyOd1TC.png")
      .setFooter({
        text: `© 2022 - OMEGA - System`,
        iconURL: `https://i.imgur.com/RyOd1TC.png`,
      });

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        // .setCustomId("gioca")
        .setLabel("GIOCA")
        .setStyle("LINK")
        .setURL("http://omegarp.it/play.html")
        .setEmoji("🕹️")
    );

    await interaction.channel.send({ embeds: [embed], components: [button] });
  },

  async regolamento(interaction, titolo, descrizione) {
    const embed = new Discord.MessageEmbed()
      .setColor("#fec814")
      .setTitle(titolo)
      .setDescription(descrizione)
      // .setThumbnail(
      //   "http://omegarp.andreamarucci.com/assets/images/icone/global_ruleset.png"
      // )
      .addFields(
        { name: "\u200B", value: "\u200B" },
        {
          name: "Termini di Servizio di Discord",
          value: "[Leggi](https://discord.com/guidelines)",
          inline: true,
        },
        {
          name: "Linee Guida Server di Discord",
          value:
            "[Leggi](https://support.discord.com/hc/it/articles/360035969312)",
          inline: true,
        },
        {
          name: "Regole dei Termini d'età",
          value:
            "[Leggi](https://support.discord.com/hc/it/articles/360040724612-Why-is-Discord)",
          inline: true,
        }
      )
      .setImage("https://i.imgur.com/q9DivXt.png")
      .setFooter({
        text: `© 2022 - OMEGA - System`,
        iconURL: `https://i.imgur.com/RyOd1TC.png`,
      });

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("accetta_regolamento")
        .setLabel("ACCETTA REGOLAMENTO")
        .setStyle("SECONDARY")
        .setEmoji("📄")
    );

    interaction.channel.send({
      embeds: [embed],
      components: [button],
    });
  },

  async giveaway(interaction, titolo, descrizione, emoji, choice) {
    const embed = new Discord.MessageEmbed()
      .setColor("#fec814")
      .setTitle(titolo)
      .setDescription(descrizione)
      .setThumbnail("https://i.imgur.com/RyOd1TC.png")
      .setFooter({
        text: `© 2022 - OMEGA - Giveaway`,
        iconURL: `https://i.imgur.com/RyOd1TC.png`,
      });

    await interaction.channel.send({ embeds: [embed] }).then((m) => {
      m.react(emoji);
      console.log(emoji);
      activateGiveaway(interaction, m.id, m.channelId, choice);
    });
  },

  // async partecipantiGiveaway(interaction, titolo, descrizione, emoji, choice) {
  //   const embed = new Discord.MessageEmbed()
  //     .setColor("#fec814")
  //     .setTitle(titolo)
  //     .setDescription(descrizione)
  //     .setThumbnail("https://i.imgur.com/RyOd1TC.png")
  //     .setFooter({
  //       text: `© 2022 - OMEGA - Giveaway`,
  //       iconURL: `https://i.imgur.com/RyOd1TC.png`,
  //     });

  //   await interaction.channel.send({ embeds: [embed] }).then((m) => {
  //     m.react(emoji);
  //     console.log(emoji);
  //     activateGiveaway(interaction, m.id, m.channelId, choice);
  //   });
  // },
};

const activateGiveaway = async (interaction, messageId, channelId, choice) => {
  //db
  await dbClient.connect();
  const database = dbClient.db(`OMEGA_${interaction.guild.id}`);
  const giveaways = database.collection("OMEGA_Giveaways");

  try {
    const query = { isClosed: false, isActive: false, _id: ObjectId(choice) };

    await giveaways.findOneAndUpdate(query, {
      $set: {
        isActive: true,
        messageId: messageId,
        channelId: channelId,
      },
    });

    commandsInit(interaction.guildId);
    console.log(
      `${log.system} Giveaway attivato da ${interaction.user.username}#${interaction.user.discriminator}`
    );
  } catch (e) {
    console.log(log.error + e);
  }
};
