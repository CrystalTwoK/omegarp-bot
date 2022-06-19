/*
Project OMEGA
Author: Andrea Marucci
*/

require("dotenv").config();
require("colors");
const MongoClient = require("mongodb").MongoClient;
const Discord = require("discord.js");
const embedMessage = require("./discord/embedMessage");
const { counterUpdate } = require("./events/guildCounter");

global.token = process.env.token;
global.db = process.env.db;
global.clientId = process.env.clientid;

global.client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_VOICE_STATES",
  ],
});

global.guild = global.choicesArray = [];
global.countersArray = [];
global.commands = [];
global.log = {
  default: "[OMEGA]".bgGreen.black,
  system: `${"[OMEGA]".bgGreen.black} ${"SYSTEM".blue} ${">>> ".red}`,
  db: `${"[OMEGA]".bgGreen.black} ${"DATABASE".yellow} ${">>> ".red} `,
  error: `${"[OMEGA]".bgGreen.black} ${"ERROR".red} ${">>> ".red} `,
};
client.login(token);

client.on("ready", async () => {
  const { ready } = require("./startup");
  const reset = false;
  console.clear();
  await ready();
  if (!reset) {
    const { commandsInit } = require("./events/commandsInit");
    const guilds = client.guilds.cache.map((guild) => guild.id);
    for (let guild of guilds) {
      commandsInit(guild);
    }

    MongoClient.connect(db, (err, db) => {
      if (err) console.log(log.error + err);
      console.log(log.db + "Database Connection Enstablished");
    });
  } else {
    const { reset } = require("./events/reset");
    await reset();
  }
});

client.on("interactionCreate", (interaction) => {
  const { execute } = require("./events/execute");
  const { executeButton } = require("./events/executeButton");
  const { isAdmin } = require("./handlers/isAdmin");
  if (interaction.isCommand()) {
    if (isAdmin(interaction)) {
      execute(interaction);
    } else {
      embedMessage.reply(interaction, "#ff0000", "Non sei un amministratore!");
    }
  } else if (interaction.isButton()) {
    executeButton(interaction);
  } else {
    return;
  }
});

setInterval(() => {
  const guild = client.guilds.cache.get("981963899505090561");
  counterUpdate(guild);
}, 900000);

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  counterUpdate(guild);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  counterUpdate(guild);
});

// client.on("messageCreate", (msg) => {
//   const insideTicket = msg.channel.name.startsWith("ticket-");
//   //checks if the user is writing inside the Ticket

//   if (insideTicket) {
//     const date = dateUpdate(msg.createdTimestamp);
//     const messageCache = `\n[${date}] ${msg.author.username}: ${msg.content} ${printAttachments}`;
//     updateTicket(msg.channelId, msg.author.username, msg.content);
//     if (msg.attachments) {
//       // if the message contains attachments, these will be included in the Messages Log
//       let attachments = msg.attachments;
//       for (let file of attachments) {
//         printAttachments =
//           printAttachments + `\n └[attachments]: ${file[1].url}`;
//         /*Through a global variable (messageCache and printAttachments) i contain every information and then
//         insert it in the Database in order to have everything stored in a temporary and safe storage */
//       }
//     }
//   }
// });
