exports.run = (client, message) => {
    const Discord =  require("discord.js")
    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription("Удалил сообщение\nВ канале : " + message.channel 
        + "\nСодержание сообщения : " + message.toString() 
        + "\nВремя создания : " + message.createdAt.getHours()
        + ":" + message.createdAt.getMinutes() 
        + ":" + message.createdAt.getSeconds()
        + ", " + message.createdAt.getDate()
        + ".0" + message.createdAt.getMonth()
        + "." + message.createdAt.getFullYear())
    .setColor("ffda8b")
    .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
    message.guild.channels.get("469145765659410432").send(embed);
};