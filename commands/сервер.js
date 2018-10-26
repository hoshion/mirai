exports.run = (client, message, args) => {
    const Discord = require('discord.js')
    const embed = new Discord.RichEmbed() 
       .setColor(0xffffff)
       .setTitle('Серверинфо')
       .setDescription('Данные:')
       .addField('id', message.guild.id, true)
       .addField('Владелец', message.guild.owner, true)
       .addField('id владельца', message.guild.ownerID, true)
       .addField('Роли', message.guild.roles.size, true)
       .addField('Регион', message.guild.region, true)
       .setThumbnail(message.guild.iconURL)
    msg.channel.send(embed)
    }
}
