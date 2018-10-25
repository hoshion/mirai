exports.run = (client, message) => {
    const Discord = require('discord.js');
    const otherAvatar = message.mentions.members.first();
    const embedAvatar = new Discord.RichEmbed().setDescription(`[Ссылка на аватар](${message.author.avatarURL})`).setImage(message.author.avatarURL).setColor("ffda8b");
    if(!otherAvatar){
        message.channel.send(embedAvatar).catch((err) => console.log('Команда "аватар" использована пользователем' + message.author.username + '. Результат - ошибка :'));
    } else {
    const embedAvatarOther = new Discord.RichEmbed().setImage(otherAvatar.user.avatarURL).setColor("ffda8b");
    message.channel.send(embedAvatarOther).catch((err) => console.log('Команда "аватар" использована пользователем' + message.author.username + '. Результат - ошибка :'));
    }
}
