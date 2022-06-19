const MongoClient = require("mongodb").MongoClient;
const dbClient = new MongoClient(db);
const { dateUpdate } = require("../handlers/dateUpdate");

const insertTicket = async (
  interaction,
  ticketID,
  authorID,
  tipologia,
  timestamp
) => {
  //db
  await dbClient.connect();
  const database = dbClient.db(`OMEGA_${interaction.guild.id}`);
  const tickets = database.collection("OMEGA_Tickets");

  const date = dateUpdate(timestamp);
  const messages = "";
  try {
    const doc = {
      ticketID: ticketID,
      authorID: authorID,
      createDate: date,
      closeDate: "",
      type: tipologia,
      messages: messages,
      isClosed: false,
    };

    await tickets.insertOne(doc);
    console.log(`${log.system} Ticket Created: ${ticketID}`);
  } catch (e) {
    console.log(log.error + e);
  }
};

module.exports = { insertTicket };
