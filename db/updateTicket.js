const updateTicket = async (ticketID, message) => {
  //db
  await dbClient.connect();
  const database = dbClient.db(`OMEGA_${interaction.guild.id}`);
  const tickets = database.collection("OMEGA_Tickets");
  try {
    const filter = {
      ticketID: ticketID,
    };

    const findToArray = await tickets.find(filter).toArray();
    const oldMessages = findToArray[0].messages;
    const update = {
      $set: {
        messages: oldMessages + message,
      },
    };

    await tickets.updateOne(filter, update);
    console.log(`${log.db}Ticket Updated: ${ticketID}`);
  } catch (e) {
    console.log(log.error + e);
  }
};
