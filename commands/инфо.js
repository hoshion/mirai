exports.run = (client, message) => {
    const Discord = require('discord.js');
    const anotherMember = message.mentions.members.first();
    if(!anotherMember){
		const embed = new Discord.RichEmbed()
			.setAuthor(message.author.username)
			.setThumbnail(message.author.avatarURL)
			.addField(`ID`, message.author.id, true)
			.addField(`Никнейм`, message.member.nickname, true)
			.addField(`Аккаунт создан`, message.author.createdAt)
			.addField(`Вступил на сервер`, message.member.joinedAt)
		return message.channel.send(embed);
	}
	const embed = new Discord.RichEmbed()
		.setAuthor(anotherMember.user.username)
		.setThumbnail(anotherMember.user.avatarURL)
		.addField(`ID`, anotherMember.user.id, true)
		.addField(`Никнейм`, anotherMember.nickname, true)
		.addField(`Аккаунт создан`, anotherMember.user.createdAt)
		.addField(`Вступил на сервер`, anotherMember.joinedAt)
	return message.channel.send(embed);
}
