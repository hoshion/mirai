exports.run = (client, message, [mention, ...reason]) => {
    const Discord = require("discord.js");
    var member = message.mentions.members.first();

    if(!member) return message.channel.send("Вы не указали человека!");
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Недостаточно прав!");

    console.log(message.author.username + " Использовал команду -бан @" + member.user.tag);
    
    member.ban(reason.join(" "))
    .then(() => message.channel.send("Вы забанили **" + member.user.tag + "** по причине **" + reason + "** !"))
    .catch(() => message.channel.send("Чота у него дофига прав."));
    const channel = message.guild.channels.get("489485275903295513");
    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription("Забанил человека " + member.user.tag + "\nПо причине : " + reason.join(" "))
    .setColor("ff0000")
    .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
    channel.send(embed);
}
