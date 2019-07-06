const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ disableEveryone: true });
const { TOKEN, NOMBRE } = "/config.json";
const PREFIX = ".";
client.commands = new Discord.Collection();

fs.readdir("./comandos/", (err, files) => {
  if(err) {
    console.log(`[${NOMBRE}] ERROR: ${err}`);
    return;
  }
  
  let archivoJs = files.filter(f => f.split(".").pop() === "js");
  if(archivoJs.length <= 0) {
    console.log(`[${NOMBRE}] ERROR: No se ha cargado ningún comando.`);
    return;
  }
  
  archivoJs.forEach((f, i) => {
    let archivoComando = require(`./comandos/${f}`);
    console.log(`[${NOMBRE}] INFO: El comando ${f} ha sido cargado correctamente.`);
    client.commands.set(archivoComando.help.name, archivoComando);
  });
});

client.on("message", async(message) => {
  if(message.author.bot) {
    return null;
  }
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
    
  let archivoComando = client.commands.get(cmd.slice(PREFIX.length));
  if(archivoComando) {
    archivoComando.run(client, message, args);
  }
  if(message.channel.type === "dm") {
    return null;
  }
  if(message.content.indexOf(PREFIX) !== 0) {
    return null;
  }
});

client.on("ready", function(bot) { 
  console.log(`\n\n¡Conectado a Discord!\nInvitación: https://discordapp.com/api/oauth2/authoride?client_id=${client.user.id}&permissions=8&scope=bot\n\nNombre del Bot: ${client.user.tag}\nServidores: ${client.guilds.size}\nUsuarios: ${client.users.size}\n\n`);
  
  let estados = [`Hola!`];
  
  setInterval(function() {
    let estado = estados[Math.floor(Math.random() * estados.length)];
    
    client.user.setPresence({
      status: "invisible",
      game: {
        name: estado,
        type: "PLAYING"
      }
    });
  }, 5000);
});




client.login("NTk3MTY4NDg4ODM0MTM4MTIy.XSENKg.8DiRmKc_5WUpCVYsBaSLGsP_rk0");