const { insertTicket } = require("../db/insertTicket");
const embedMessage = require("../discord/embedMessage");
const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);
let ObjectId = require("mongodb").ObjectId;
const {
  printAllMessages,
  getLastMessageId,
} = require("../discord/tickets/saveTicket");

const executeButton = (interaction) => {
  try {
    const logsChannel =
      interaction.guild.channels.cache.get("987587331408150538");
    const everyone = interaction.guild.roles.cache.get("981963899505090561");
    const staffRole = interaction.guild.roles.cache.get("984068830554910781");
    switch (interaction.customId) {
      case "permadeath":
        if (
          interaction.guild.channels.cache.find(
            (canale) => canale.topic == `Permadeath: ${interaction.user.id}`
          )
        ) {
          return embedMessage.reply(
            interaction,
            "#ff0000",
            "Hai un già un Ticket Permadeath aperto!"
          );
        } else {
          interaction.guild.channels
            .create(`ticket-${interaction.user.username}`)
            .then((canale) => {
              canale.setTopic(`Permadeath: ${interaction.user.id}`);
              canale.setParent("986369663250362369");
              console.log(
                log.system +
                  `${interaction.user.username} Opened a Permadeath Ticket`
              );
              insertTicket(
                interaction,
                interaction.channelId,
                interaction.user.id,
                interaction.customId,
                interaction.createdTimestamp
              );

              canale.permissionOverwrites.set([
                {
                  id: everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: interaction.user.id,
                  allow: ["VIEW_CHANNEL"],
                },
              ]);

              embedMessage.reply(
                interaction,
                "#fec814",
                `Il tuo ticket è stato aperto!`,
                `<#${canale.id}>`
              );

              embedMessage.pvt(
                interaction,
                "TICKET APERTO",
                `**TICKET:** <#${canale.id}> \n**ID AUTORE:** ${interaction.user.id} \n**ID TICKET:** ${canale.id} \n**TIPOLOGIA:** PERMADEATH`
              );

              logTicketAperto(interaction, canale, logsChannel, "permadeath");
              embedMessage.ticketCloser(interaction, canale); //invia messaggio di chiusura all'interno del ticket
            });
        }
        break;

      case "tecnico":
        if (
          interaction.guild.channels.cache.find(
            (canale) =>
              canale.topic == `Supporto Tecnico: ${interaction.user.id}`
          )
        ) {
          return embedMessage.reply(
            interaction,
            "#ff0000",
            "Hai un già un Ticket aperto per il Supporto Tecnico!"
          );
        } else {
          interaction.guild.channels
            .create(`ticket-${interaction.user.username}`)
            .then((canale) => {
              canale.setTopic(`Supporto Tecnico: ${interaction.user.id}`);
              canale.setParent("986369712931893329");
              console.log(
                log.system +
                  `${interaction.user.username} Opened a Tech Support Ticket`
              );
              insertTicket(
                interaction,
                interaction.channelId,
                interaction.user.id,
                interaction.customId,
                interaction.createdTimestamp
              );

              canale.permissionOverwrites.set([
                {
                  id: everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: staffRole,
                  allow: ["VIEW_CHANNEL"],
                },
                {
                  id: interaction.user.id,
                  allow: ["VIEW_CHANNEL"],
                },
              ]);

              embedMessage.reply(
                interaction,
                "#fec814",
                `Il tuo ticket è stato aperto!`,
                `<#${canale.id}>`
              );

              embedMessage.pvt(
                interaction,
                "TICKET APERTO",
                `**TICKET:** <#${canale.id}> \n**ID AUTORE:** ${interaction.user.id} \n**ID TICKET:** ${canale.id} \nTIPOLOGIA: SUPPORTO TECNICO`
              );

              logTicketAperto(interaction, canale, logsChannel, "tecnico");
              embedMessage.ticketCloser(interaction, canale); //invia messaggio di chiusura all'interno del ticket
            });
        }
        break;

      case "generico":
        if (
          interaction.guild.channels.cache.find(
            (canale) => canale.topic == `Generico: ${interaction.user.id}`
          )
        ) {
          return embedMessage.reply(
            interaction,
            "#ff0000",
            "Hai un già un Ticket Generico aperto!"
          );
        } else {
          interaction.guild.channels
            .create(`ticket-${interaction.user.username}`)
            .then((canale) => {
              canale.setTopic(`Generico: ${interaction.user.id}`);
              canale.setParent("986369900954148954");
              console.log(
                log.system +
                  `${interaction.user.username} Opened a Generic Ticket`
              );

              insertTicket(
                interaction,
                interaction.channelId,
                interaction.user.id,
                interaction.customId,
                interaction.createdTimestamp
              );

              canale.permissionOverwrites.set([
                {
                  id: everyone,
                  deny: ["VIEW_CHANNEL"],
                },
                {
                  id: staffRole,
                  allow: ["VIEW_CHANNEL"],
                },
                {
                  id: interaction.user.id,
                  allow: ["VIEW_CHANNEL"],
                },
              ]);

              embedMessage.reply(
                interaction,
                "#fec814",
                `Il tuo ticket è stato aperto!`,
                `<#${canale.id}>`
              );

              embedMessage.pvt(
                interaction,
                "TICKET APERTO",
                `**TICKET:** <#${canale.id}> \n**ID AUTORE:** ${interaction.user.id} \n**ID TICKET:** ${canale.id} \n**TIPOLOGIA**: GENERICO`
              );

              logTicketAperto(interaction, canale, logsChannel, "generico");
              embedMessage.ticketCloser(interaction, canale); //invia messaggio di chiusura all'interno del ticket
            });
        }
        break;

      case "chiudi":
        embedMessage.ticketCloseConfirm(interaction);
        printAllMessages(
          interaction.channelId,
          getLastMessageId(interaction.channelId)
        );
        break;

      case "conferma":
        interaction.reply({
          content: "Ticket in chiusura...",
          components: [],
          ephemeral: true,
        });

        setTimeout(() => {
          interaction.channel.delete();

          let tipologia = "";

          if (interaction.channel.topic.startsWith("Generico: ")) {
            tipologia = "GENERICO";
          } else if (
            interaction.channel.topic.startsWith("Supporto Tecnico: ")
          ) {
            tipologia = "SUPPORTO TECNICO";
          } else if (interaction.channel.topic.startsWith("Permadeath: ")) {
            tipologia = "PERMADEATH";
          }

          logsChannel.send({
            files: [
              {
                attachment: `logs/${interaction.channel.name}_${interaction.channelId}.html`,
                name: `${interaction.channel.name}_${interaction.channelId}.html`,
              },
            ],
            content: `@here\n**TICKET CHIUSO** \n\n**TICKET:** ${interaction.channel.name} \n**ID TICKET:** ${interaction.channelId} \n**TIPOLOGIA:** ${tipologia} \n**CHIUSO DA:** <@${interaction.user.id}> \n\n\n**LOGS:**`,
          });
        }, 5000);

        break;

      case "verifica":
        const verifyRole =
          interaction.channel.guild.roles.cache.get("984065659111604235");
        if (
          !interaction.member.roles.cache.some(
            (r) => r.id === "984065659111604235"
          )
        ) {
          interaction.member.roles.add(verifyRole);
          embedMessage.reply(
            interaction,
            "#00ff00",
            "Verifica Effettuata!",
            ""
          );
        } else {
          embedMessage.reply(
            interaction,
            "#ff0000",
            "Hai già effettuato la verifica!"
          );
        }
        break;

      case "accetta_regolamento":
        const waitAllowlist =
          interaction.channel.guild.roles.cache.get("984072303333748746");
        const cittadino =
          interaction.channel.guild.roles.cache.get("984065659111604235");
        if (
          !interaction.member.roles.cache.some(
            (r) => r.id === "984072303333748746"
          )
        ) {
          interaction.member.roles.add(waitAllowlist);
          interaction.member.roles.add(cittadino);
          embedMessage.reply(
            interaction,
            "#00ff00",
            "Hai accettato il regolamento!",
            "Invia il tuo modulo whitelist nel canale " +
              `<#984204541606101012>`
          );
        } else {
          embedMessage.reply(
            interaction,
            "#ff0000",
            "Hai già accettato il regolamento!"
          );
        }
        break;
    }
  } catch (e) {
    console.log("ERROR: " + e);
  }
};

const logTicketAperto = (interaction, ticketChannel, logs, type) => {
  switch (type) {
    case "permadeath":
      type = "PERMADEATH";
      break;
    case "tecnico":
      type = "SUPPORTO TECNICO";
      break;
    case "generico":
      type = "GENERICO";
      break;
  }
  logs.send({
    content: `@here\n**TICKET APERTO** \n\n**TICKET:** <#${ticketChannel.id}> \n**ID AUTORE:** ${interaction.user.id} \n**ID TICKET:** ${ticketChannel.id} \n**TIPOLOGIA:** ${type} \n**APERTO DA:** <@${interaction.user.id}>`,
  });
};

module.exports = { executeButton };
