const fs = require("fs");

/* Importing local modules */
const Structures = require("./Structures");
const Converters = require("./Converter");
const toHTML = require("./htmlConverter");
const { htmlStart, htmlEnd } = require("./htmlConverter");

const config = require("../../config.json");

if (config.export_type == "json") {
  console.log(`Export type: JSON`);
  var messageHistory = new Array();
} else {
  console.log(`Export type: md`);
  var messageHistory = "";
}

/* Counting recursions */
let recursionMeter = 0;

/* Get message id for the first time */
function getLastMessageId(channelId) {
  client.channels.cache
    .get(channelId)
    .messages.fetch({ limit: 1 })
    .then((message) => message.values().next().value.id);
}

/* Main recursive function that will do the task */
function printAllMessages(channelId, before) {
  const channel = client.channels.cache.get(channelId);
  client.channels.cache
    .get(channelId)
    .messages.fetch({
      limit: 100,
      before: before,
    })
    .then((message) => {
      let nextMessageID = "";

      /* Push to the array containing chat history */
      message.each((key, value) => {
        // console.log(`${key.content} | ${key.author.username}#${key.author.discriminator} | ${key.id}`);
        const currentMessage = new Structures.MessageStructureInJSON(key);
        console.log(currentMessage);

        if (config.export_type == "json") messageHistory.push(currentMessage);
        else if (config.export_type == "md")
          messageHistory +=
            Converters.convertMessageStructureIntoMarkdown(currentMessage) +
            "\n";
        else if (config.export_type == "html")
          messageHistory +=
            toHTML.convertMessageStructureIntoHTML(currentMessage) + "</br>";
      });

      /* Do recursion */
      if (nextMessageID != "") {
        ++recursionMeter;
        console.log(recursionMeter * 100, "messages have been fetched");
        printAllMessages(channelId, nextMessageID);
      } else {
        /* Write to file */
        fs.writeFile(
          `logs/${channel.name}_${channelId}.html`,
          config.export_type === "json"
            ? JSON.stringify(messageHistory, null, 4)
            : htmlStart + messageHistory + htmlEnd,
          (err) => {
            if (err) throw err;

            console.log("Messages are saved!");
          }
        );
      }
    })
    .catch((err) => console.log(err));
}

module.exports = { printAllMessages, getLastMessageId };
