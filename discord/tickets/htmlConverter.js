// Convert message into markdown
// mS means messageStructure and its kinda hard to retype everytime lol ;p

const htmlStart = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
        <title>OMEGA TICKET LOGS</title>
    </head>
    <body style="background-color: #36393f; font-size: 0.7em">`;

const htmlEnd = `</body></html>`;

function convertMessageStructureIntoHTML(mS) {
  let convertedMessage =
    // `<h1 style=" margin: 0; color: white; background-color: #36393f; font-family: 'Poppins';"> ${mS.channelName} (${mS.channelId}) </h1>` +
    // `</hr>` +
    `<div style="padding: 10px 20px; margin: 0; color: white; background-color: #36393f; font-family: 'Poppins'; border-bottom: 1px solid grey;">` +
    `<h2 style="color: white; font-weight: 800; display: flex; align-items: center">
    <img src='${mS.author.avatar}' style='border-radius: 50%; width: 35px;'/> 
    <span style="padding: 0 10px"> ${mS.author.name} </span> 
    <span style="color: grey; font-style: italic; font-size: 0.6em;"> ${mS.time} </span>
    </h2>` +
    `<i>${mS.content} </i>` +
    `</br>
    </br>`;

  //   mS.attachments.forEach((perAttachment) => {
  //     convertedMessage += `<img src="${perAttachment}" width="200px" style="border-radius: 10px;"/>\n`;
  //   });

  return convertedMessage + "</div>";
}

module.exports = {
  convertMessageStructureIntoHTML: convertMessageStructureIntoHTML,
  htmlStart,
  htmlEnd,
};
