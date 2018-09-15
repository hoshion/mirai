exports.run = (client, message, [mention, ...reason]) => {
    const Discord = require("discord.js");
    var member = message.mentions.members.first();

    if(!member) return message.channel.send("Вы не указали человека!");
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Недостаточно прав!");

    console.log(message.author.username + " Использовал команду -кик @" + member.user.username);

    member.kick(reason.join(""))
    .then(() => message.channel.send("Вы кикнули **" + member.user.username + "** по причине **" + reason + "** !"))
    .catch(() => message.channel.send("Чота у него дофига прав."));
    const channel = message.guild.channels.get("490502418140889088");
    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription("Кикнул человека " + member.user.username + "\nПо причине : " + reason.join(" "))
    .setColor("ff0000")
    .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
    channel.send(embed);
}
