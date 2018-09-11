exports.run = (client, message) => {
    const Discord = require("discord.js");
    const embed = new Discord.RichEmbed().setImage("https://is4-ssl.mzstatic.com/image/thumb/Purple71/v4/c5/a1/9d/c5a19dad-689b-0bdc-d303-82bbfa5a0ab1/source/512x512bb.jpg").setColor("ffda8b");
    message.channel.send(embed);
    console.log('Команда "ррар" использована пользователем ' + message.author.username + '. Результат - успешно');
}