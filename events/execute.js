const fs = require("fs");

const execute = (interaction) => {
  try {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.startsWith(interaction.commandName));
      for (const file of commandFiles) {
        let command = [];
        command = require(`../commands/${folder}/${file}`);
        command.execute(interaction);
      }
    }
  } catch (e) {
    console.log(log.error + "[execute.js/execute()] " + e);
  }
};

module.exports = { execute };
