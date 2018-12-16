exports.run = (client, message) => {
    const Discord = require('discord.js');
	try {
		const anotherMember = message.mentions.members.first();
		if(!anotherMember){
			const embed = new Discord.RichEmbed()
				.setAuthor(message.author.username)
				.setThumbnail(message.author.avatarURL)
				.addField(`ID`, message.author.id, true)
				.addField(`Никнейм`, nickname(message.member), true)
				.addField(`Аккаунт создан`, message.author.createdAt)
				.addField(`Вступил на сервер`, message.member.joinedAt)
			return message.channel.send(embed);
		}
		const embed = new Discord.RichEmbed()
			.setAuthor(anotherMember.user.username)
			.setThumbnail(anotherMember.user.avatarURL)
			.addField(`ID`, anotherMember.user.id, true)
			.addField(`Никнейм`, nickname(anotherMember), true)
			.addField(`Аккаунт создан`, anotherMember.user.createdAt)
			.addField(`Вступил на сервер`, anotherMember.joinedAt)
		return message.channel.send(embed);
	} catch(err) {
		client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
	}
}
function nickname(nick) {
	if(!nick.nickname) return nick.user.username;
	else return nick.nickname
}
