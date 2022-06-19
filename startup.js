const ready = async () => {
  try {
    const signature = [
      " ",

      "   $$$$$$   $$       $$  $$$$$$$$   $$$$$$    $$$$$$   ",
      "  $$    $$  $$$     $$$  $$        $$    $$  $$    $$  ",
      "  $$    $$  $$$$   $$$$  $$        $$        $$    $$  ",
      "  $$    $$  $$ $$ $$ $$  $$$$$     $$  $$$$  $$$$$$$$  ",
      "  $$    $$  $$  $$$  $$  $$        $$    $$  $$    $$  ",
      "  $$    $$  $$   $   $$  $$        $$    $$  $$    $$  ",
      "   $$$$$$   $$       $$  $$$$$$$$   $$$$$$   $$    $$  ",

      " ",
      "Author: Andrea Marucci",
      " ",
    ];

    for (const line of signature) {
      console.log(line);
    }
  } catch (e) {
    console.log(log.error + "[startup.js/ready()] " + e);
  }
};

module.exports = { ready };
