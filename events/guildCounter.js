const counterUpdate = async (guild) => {
  const allmemberValue = guild.memberCount;
  const botsonlyValue = guild.members.cache.filter((m) => m.user.bot).size;
  const membersonlyValue = parseInt(allmemberValue) - parseInt(botsonlyValue);
  console.log(log.system + "Totale: " + allmemberValue);
  console.log(log.system + "Membri: " + membersonlyValue);
  console.log(log.system + "Bots: " + botsonlyValue);

  const allmembers = guild.channels.cache.get("986191632187686912");
  allmembers.setName(`🌐｜ᴛᴏᴛᴀʟᴇ: ${guild.memberCount}`);

  const botsonly = guild.channels.cache.get("986191814413418568");
  botsonly.setName(`🤖｜ʙᴏᴛꜱ: ${botsonlyValue}`);

  const membersonly = guild.channels.cache.get("986191761397407774");
  membersonly.setName(`👤｜ᴍᴇᴍʙʀɪ: ${membersonlyValue}`);
  console.log(log.system + "Member count updated.");
};

module.exports = { counterUpdate };

//questa funzione viene richiamata ogni volta che un utente entra all'interno del server e aggiorna tutti i counter attivi
/* 
on counter create
Schema: 

guildId
channelId
label > option.value
type: botsonly, membersonly, allmembers
isActive:


in parallelo ogni 15 minnuti viene fatto un update a prescindere se un utente entra o meno.

*/
