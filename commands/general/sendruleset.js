const { SlashCommandBuilder } = require("@discordjs/builders");
const embedMessage = require("../../discord/embedMessage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendruleset")
    .setDescription("Invia il regolamento ufficiale del Discord"),
  async execute(interaction) {
    try {
      await embedMessage.regolamento(
        interaction,
        "REGOLAMENTO DISCORD",
        "**☀️ ʙᴇɴᴠᴇɴᴜᴛɪ ɪɴ Qᴜᴇꜱᴛᴀ ɢʀᴀɴᴅɪᴏꜱᴀ ᴄɪᴛᴛÀ, ᴠɪ ɪɴᴠɪᴛɪᴀᴍᴏ ᴀ ʟᴇɢɢᴇʀᴇ ɪʟ ɴᴏꜱᴛʀᴏ ʀᴇɢᴏʟᴀᴍᴇɴᴛᴏ ᴅᴀ ᴛᴇɴᴇʀᴇ ᴀʟʟ'ɪɴᴛᴇʀɴᴏ ᴅᴇʟ ɴᴏꜱᴛʀᴏ ᴅɪꜱᴄᴏʀᴅ. ☀️**\n \n" +
          "➤ 💌 ᴇꜱꜱᴇʀᴇ ʀɪꜱᴘᴇᴛᴛᴏꜱɪ ɴᴇɪ ᴄᴏɴꜰʀᴏɴᴛɪ ᴅɪ ᴀʟᴛʀɪ ᴜᴛᴇɴᴛɪ, ɴᴏ ᴅɪꜱᴄʀɪᴍɪɴᴀᴢɪᴏɴɪ, ᴏᴍᴏꜰᴏʙɪᴀ, ᴇꜱᴄʟᴜꜱɪᴏɴɪ, ᴍᴏʟᴇꜱᴛɪᴇ, ʙᴇꜱᴛᴇᴍᴍɪᴇ, ʙʟᴀꜱꜰᴇᴍɪᴇ ᴏ ᴘᴀʀᴏʟᴀᴄᴄᴇ ᴛʀᴏᴘᴘᴏ ᴠᴏʟɢᴀʀɪ.\n" +
          "➤ 📗 ᴍᴀɴᴛᴇɴᴇʀᴇ ꜱᴇᴍᴘʀᴇ ᴜɴ ᴄᴏᴍᴘᴏʀᴛᴀᴍᴇɴᴛᴏ ɪᴅᴏɴᴇᴏ ᴇ ʀɪꜱᴘᴇᴛᴛᴏꜱᴏ ɴᴇɪ ᴄᴏɴꜰʀᴏɴᴛɪ ᴅᴇɢʟɪ ᴀʟᴛʀɪ ᴜᴛᴇɴᴛɪ.\n" +
          "➤ 🔞 ᴠɪᴇᴛᴀᴛɪ ᴍᴇꜱꜱᴀɢɢɪ ᴄʜᴇ ʀᴀꜰꜰɪɢᴜʀᴀɴᴏ ᴄᴏɴᴛᴇɴᴜᴛɪ ɴꜱꜰᴡ, ᴛʀᴏᴘᴘᴏ ᴇꜱᴘʟɪᴄɪᴛɪ ᴇᴅ ᴇᴄᴄᴇꜱꜱɪᴠᴀᴍᴇɴᴛᴇ ᴠɪᴏʟᴇɴᴛɪ.\n" +
          "➤ 🤚 È ᴠɪᴇᴛᴀᴛᴏ Qᴜᴀʟꜱɪᴀꜱɪ ᴛɪᴘᴏ ᴅɪ ꜱᴘᴀᴍ.*\n" +
          "➤ 🤚 ᴇᴠɪᴛᴀʀᴇ ᴅɪ ᴛᴀɢɢᴀʀᴇ ᴇᴄᴄᴇꜱꜱɪᴠᴀᴍᴇɴᴛᴇ ᴜᴛᴇɴᴛɪ ᴇ ꜱᴛᴀꜰꜰ ɪɴᴜᴛɪʟᴍᴇɴᴛᴇ.\n" +
          "➤  🚀 ɴᴏɴ ᴀᴛᴛɪᴠᴀʀᴇ ᴅɪꜱᴄᴜꜱꜱɪᴏɴɪ ɪɴ ᴍᴇʀɪᴛᴏ ᴀ ᴘᴏʟɪᴛɪᴄᴀ, ɢᴜᴇʀʀᴇ, ʀᴇʟɪɢɪᴏɴᴇ, ꜱᴜɪᴄɪᴅɪᴏ, ᴍᴏʀᴛᴇ, ꜱᴀʟᴜᴛᴇ ᴏ ᴀʟᴛʀɪ ᴀʀɢᴏᴍᴇɴᴛɪ ᴛʀᴏᴘᴘᴏ ꜱᴇɴꜱɪʙɪʟɪ.*\n\n" +
          "🛎️ ᴏɢɴɪ ɢɪᴏʀɴᴏ ᴄɪ ɪᴍᴘᴇɢɴɪᴀᴍᴏ ᴀ ᴍᴀɴᴛᴇɴᴇʀᴇ ɪʟ ꜱᴇʀᴠᴇʀ ᴘᴜʟɪᴛᴏ. ꜰᴀᴛᴇ ɪ ʙʀᴀᴠɪ ᴇ ᴅɪᴠᴇʀᴛɪᴛᴇᴠɪ!🛎️"
      );
      embedMessage.reply(
        interaction,
        "#00ff00",
        "Regolamento di Discord inviato con successo!"
      );
    } catch (e) {
      console.log(log.error + " [sendrulesety.js/execute()]" + e);
    }
  },
};
