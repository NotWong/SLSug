const Discord = require('discord.js');

exports.run = async (client, message, args, prefix) => {


    var canalSugerencia = true
    if(message.guild.channels.find("name", "»〘🍦〙sugerencias")) canalSugerencia = true

    if(canalSugerencia == false) return message.reply(`Canal de sugerencias no encontrado.`)

    const comousar = new Discord.RichEmbed()
    .setColor("#9dfcff")
    .setTitle(`Sugerencia - SnowLand <:SnowLand:534930973469704194>`)
    .addField("Uso:", "`.sugerencia <sugerencia>`")
 


    let suges = args.join(' ');
    if(!suges) return message.channel.send(message.author, comousar);

    message.delete().catch(O_o=>{});
    const sugeseviado = new Discord.RichEmbed()
    .setColor('RANDOM')
        .setTitle("Nueva sugerencia!")
        .setThumbnail(message.author.avatarURL)
        .addField("Autor:", message.author)
        .addField("Sugerencia:", suges)
        .setTimestamp()


    if(message.guild.channels.find("name", "»〘🍦〙sugerencias")){
        let canal = message.guild.channels.find("name", "»〘🍦〙sugerencias")
        canal.send(sugeseviado).then(msg=> {
            msg.react("✅").then(r => {
            msg.react("❌")
            })})
        message.channel.send(`:white_check_mark: **|** ${message.author}, su sugerencia fue enviada correctamente!`).then(msg => msg.delete(10000));
        }

}

exports.help = {
    name: "sugerencia",
    aliases: [
        'sug',
        'suggest'
    ]
}