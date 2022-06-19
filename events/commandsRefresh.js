const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

const commandsRefresh = async () => {
  const commandFolders = fs.readdirSync("./commands");
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      let command = [];
      command = require(`../commands/${folder}/${file}`);
      global.commands.push(command.data.toJSON());
    }
  }

  const rest = new REST({ version: "9" }).setToken(token);

  (async () => {
    try {
      console.log(log.system + "Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(clientId), {
        body: global.commands,
      });

      console.log(
        log.system + "Successfully reloaded application (/) commands."
      );
    } catch (e) {
      console.log(log.error + "[commandsRefresh.js/refresh()] " + e);
    }
  })();
};

module.exports = { commandsRefresh };
