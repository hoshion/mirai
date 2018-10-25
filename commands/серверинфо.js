const Discord = require('discord.js') 

module.exports.run = async (bot, message, args) => {
    let verifilv = ['Отсутствует', 'Низкий', 'Средний', 'Высокий', 'Очень высокий']
    let embed = new Discord.RichEmbed() 
        .setAuthor(message.guild.name, message.guild.iconURL) 
        .addField('Владелец', message.guild.owner, true) 
        .addField('ID', message.guild.id, true)
        .addField('Регион', message.guild.region, true)
        .addField('Участники', `${message.guild.presences.size} в сети\n${message.guild.memberCount} всего`, true)
        .addField('Каналы', `${message.guild.channels.filter(c => c.type == 'voice').size} тестовых\n${message.guild.channels.filter(c => c.type == 'voice').size} голосовых`, true)
        .addField('Уровень проверки', verifilv[message.guild.verificationLevel], true)
        .addField('AFK Канал', message.guild.afkChannel.name, true)
        .addField('Ролей', message.guild.roles.size, true)
        .addField('Смайликов', message.guild.emojis.size, true)
        .setFooter('Сервер создан') 
        .setTimestamp(new Date(message.guild.createdTimestamp))
        .setColor(0x32d160)
    await message.channel.send(embed)
}

module.exports.help = {
    name: 'сервер'
}
