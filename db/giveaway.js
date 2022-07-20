//INSERISCE IL GIVEAWAY ALL'INTERNO DEL DATABASE
const { commandsInit } = require("../events/commandsInit");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const dbClient = new MongoClient(process.env.db);
let ObjectId = require("mongodb").ObjectId;
const embedMessage = require("../discord/embedMessage");
// const { dateUpdate } = require("../handlers/dateUpdate");

const insertGiveaway = async (
  interaction,
  authorID,
  nome,
  titolo,
  descrizione,
  emoji
) => {
  //db
  await dbClient.connect();
  const database = dbClient.db(`OMEGA_${interaction.guild.id}`);
  const giveaways = database.collection("OMEGA_Giveaways");

  try {
    const doc = {
      authorID: authorID,
      name: nome,
      title: titolo,
      description: descrizione,
      emoji: emoji,
      messageId: "",
      channelId: "",
      isActive: false,
      isClosed: false,
    };

    await giveaways.insertOne(doc);
    commandsInit(interaction.guildId);
    console.log(
      `${log.system} Giveaway creato da ${interaction.user.username}#${interaction.user.discriminator}`
    );
  } catch (e) {
    console.log(log.error + e);
  }
};

const sendGiveaway = async (interaction, choice) => {
  //db
  await dbClient.connect();
  const database = dbClient.db(`OMEGA_${interaction.guild.id}`);
  const giveaways = database.collection("OMEGA_Giveaways");

  try {
    const query = { isClosed: false, isActive: false, _id: ObjectId(choice) };

    await giveaways
      .find(query)
      .toArray()
      .then((results) => {
        if (results) {
          for (let result of results) {
            embedMessage.giveaway(
              interaction,
              result.title,
              result.description,
              result.emoji,
              choice
            );
          }
        } else {
          console.log("giveaway non presenti");
        }
      });

    commandsInit(interaction.guildId);
    console.log(
      `${log.system} Giveaway inviato da ${interaction.user.username}#${interaction.user.discriminator}`
    );
  } catch (e) {
    console.log(log.error + e);
  }
};

const partecipantiGiveaway = async (interaction, choice) => {
  //db
  await dbClient.connect();
  const database = dbClient.db(`OMEGA_${interaction.guild.id}`);
  const giveaways = database.collection("OMEGA_Giveaways");

  try {
    const query = { isActive: true, _id: ObjectId(choice) };
    const guild = interaction.guild;
    await giveaways
      .find(query)
      .toArray()
      .then((results) => {
        if (results) {
          for (let result of results) {
            guild.channels.cache
              .get(result.channelId)
              .messages.fetch(result.messageId)
              .then((reactionMessage) => {
                reactionMessage.reactions
                  .resolve(result.emoji)
                  .users.fetch()
                  .then((userList) => {
                    return console.log(userList.map((user) => user.id));
                  });
              });

            embedMessage.reply(
              interaction,
              "#00ff00",
              `Partecipanti Giveaway ${result.name}`
            );
          }
        } else {
          console.log("giveaway non presenti");
        }
      });

    commandsInit(interaction.guildId);
    console.log(
      `${log.system} Giveaway inviato da ${interaction.user.username}#${interaction.user.discriminator}`
    );
  } catch (e) {
    console.log(log.error + e);
  }
};

module.exports = { insertGiveaway, sendGiveaway, partecipantiGiveaway };
