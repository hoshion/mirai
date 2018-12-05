exports.run = (client, message, args) => {
    const Discord = require("discord.js");
	if(args[0]){
		try {	
			const commandFile = require(`../commands/${args[0]}.js`);
			commandFile.help(client, message)
		} catch(error) {
			message.channel.send("Команды не существует")
		}
	} else {
		const embed = new Discord.RichEmbed()
		.setTitle("Список команд")
		.setFooter(`Ваш бот - ${client.guilds.get(message.guild.id).me.nickname}. Версия - 1.1.3`, client.user.avatarURL)
		.setDescription("Чтобы узнать информацию об отдельной команде, напишите ***-помощь название_команды***")
		.addField("Администрирование", "**бан**,**кик**,**мут**,**картинка**,**очки**,**автороль**,**логи**,**размут**")
		.addField("Система ранкинга", "**топ**")
		.addField("Пользовательская информация", "**аватар*,**инфо****профиль**,**ранг**")
		.addField("Фан", "**кубик**,**ppap**,**Поцеловать/обнять/пнуть/ударить**,**cкажи**,**cмайлами**")
		.addField("Остальное", "**помощь**,**очистить**,**сервер**")
		.setColor("ffda8b");
		message.channel.send("Сейчас, сейчас").then(msg => {
			setTimeout(() => {
				msg.edit("Бля, никак не могу найти его")
				setTimeout(()=> {
					msg.edit("Нашёл!")
					setTimeout(() => {
						msg.delete();
						message.channel.send(embed)
					}, 1000)
				}, 1000)
			}, 2000)
		})
	}
};
