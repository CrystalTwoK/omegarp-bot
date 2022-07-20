const Canvas = require("canvas");
const Discord = require("discord.js");

const onJoin = async (member) => {
  var canvas = Canvas.createCanvas(1024, 500);

  ctx = canvas.getContext("2d");

  var background = await Canvas.loadImage("./assets/welcome.png");
  ctx.drawImage(background, 0, 0, 1000, 500);

  ctx.font = "42px sans serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(member.user.tag.toUpperCase(), 512, 410);

  ctx.beginPath();
  ctx.arc(512, 166, 119, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  var avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({
      format: "png",
      size: 1024,
    })
  );

  ctx.drawImage(avatar, 393, 47, 238, 238);

  var attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome.png"
  );

  client.channels.cache.get("984181426578665592").send({
    content: `Ciao <@${member.id}>, benvenuto in **${member.guild.name}!**\nVisita il canale <#984181366654631956> per **Accettare il Regolamento** ed inviare il **Modulo Whitelist!**`,
    files: [attachment],
  });
};

const onLeave = (member) => {
  client.channels.cache
    .get("984181488180396062")
    .send(`Ciao <@${member.id}>, torna a trovarci! 👋 `);
};

module.exports = { onJoin, onLeave };
