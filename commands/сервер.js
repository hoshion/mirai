exports.run = (client, message, args) => {
    const Discord = require('discord.js')
    const embed = new Discord.RichEmbed() 
       .setColor(0xffda8b)
       .setTitle('Серверинфо')
       .setDescription('Данные:')
       .addField('id', message.guild.id, true)
       .addField('Владелец', message.guild.owner, true)
       .addField('id владельца', message.guild.ownerID, true)
       .addField('Роли', message.guild.roles.size, true)
       .addField('Регион', message.guild.region, true)
       .addField('Участники', `${message.guild.presences.size} в сети\n${message.guild.memberCount} всего`, true)
       .addField('AFK канал', message.guild.afkChannel, true)
       .addField('Каналы', `${message.guild.channels.filter(c => c.type == 'voice').size} текстовых\n${message.guild.channels.filter(c => c.type == 'voice').size} голосовых`, true)
       .addField('Смайликов', message.guild.emojis.size, true)
       .setFooter('Сервер создан')
       .setTimestamp(new Date(message.guild.createdTimestamp))
    message.channel.send(embed)
}
function regionRename(region){
    if(region == "eu-central") return "Центр. Европа";
    else if(region == "russia") return "Россия";
    else return region;
}
