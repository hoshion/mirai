exports.run = (client, message) => {
	const Discord = require("discord.js");

	const embed = new Discord.RichEmbed()
	.setAuthor("Всем ребятам привет!")
	.setDescription("Ребята. Очень просим вас подписаться на нашу группу (Пока что нету) в ВК")
	.setFooter('C уважением - Администрация проекта "Цветущая весна"', client.user.avatarURL)
	.setColor("#FFCD00")
	.setImage("https://addons-media.operacdn.com/media/CACHE/images/themes/44/226044/1.0-rev1/images/131c62c3e4c72d278e8f6116aa48b5a7/6e4454ca553040420b160a5da4577e52.jpg")

	message.channel.send(embed);
}
