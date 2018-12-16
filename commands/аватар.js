exports.run = (client, message) => {
    const Discord = require('discord.js');
    try {
        const otherAvatar = message.mentions.members.first();
        const embedAvatar = new Discord.RichEmbed().setDescription(`[Ссылка на аватар](${message.author.avatarURL})`).setImage(message.author.avatarURL).setColor("ffda8b");
        if(!otherAvatar){
            message.channel.send(embedAvatar).catch((err) => console.log('Команда "аватар" использована пользователем' + message.author.username + '. Результат - ошибка :'));
        } else {
            const embedAvatarOther = new Discord.RichEmbed().setImage(otherAvatar.user.avatarURL).setColor("ffda8b");
            message.channel.send(embedAvatarOther).catch((err) => console.log('Команда "аватар" использована пользователем' + message.author.username + '. Результат - ошибка :'));
        }
    } catch(err) {
        client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
    }
}
exports.help = (client, message) => {
    message.channel.send(`**Информация о команде "аватар"**\n\nПозволяет увидеть ваш или чей-то аватар.\nЧтобы увидеть свой аватар, напишите \`-аватар\`\nЧтобы увидеть чужой аватар, напишите \`-аватар @упоминание\``)
}
