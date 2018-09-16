exports.run = (client, message, [mention, time, ...reason]) => {
    const Discord = require("discord.js");
    const muteMember = message.mentions.members.first();

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");
    if(!muteMember) return message.channel.send("Вы не указали человека!");
    if(!time) return message.channel.send("Вы не указали время!");

    function findTime(type){
		const timeSeconds = 1000;
    	const timeMinutes = 60000;
    	const timeHours = 3600000;
    	const timeDays = 86400000;
        if(type.length == 2){
        	const TimeType = type.slice(1).trim();
			const TimeCount = time.slice(0,1).trim();
        	if(TimeType == "с" || TimeType == "С" || TimeType == "s" || TimeType == "S") return TimeCount * timeSeconds;
			if(TimeType == "м" || TimeType == "М" || TimeType == "m" || TimeType == "M") return TimeCount * timeMinutes;
			if(TimeType == "ч" || TimeType == "Ч" || TimeType == "h" || TimeType == "H") return TimeCount * timeHours;
			if(TimeType == "д" || TimeType == "Д" || TimeType == "d" || TimeType == "D") return TimeCount * timeDays;
        }
			if(type.length == 3){
        	const TimeType = type.slice(2).trim();
			const TimeCount = time.slice(0,2).trim();
        	if(TimeType == "с" || TimeType == "С" || TimeType == "s" || TimeType == "S") return TimeCount * timeSeconds;
			if(TimeType == "м" || TimeType == "М" || TimeType == "m" || TimeType == "M") return TimeCount * timeMinutes;
			if(TimeType == "ч" || TimeType == "Ч" || TimeType == "h" || TimeType == "H") return TimeCount * timeHours;
			if(TimeType == "д" || TimeType == "Д" || TimeType == "d" || TimeType == "D") return TimeCount * timeDays;
        }
    }
	
	const mute = findTime(time);
    muteMember.addRole("490500248624562177");
    message.channel.send("**" + muteMember.user.username + "** Замучен!");
    setTimeout(() => {
        muteMember.removeRole("490500248624562177");
    }, mute);
	const muteTime = mute / 1000;
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription("Замутил человека " + muteMember.user.username + "\nНа время : " + muteTime +" cекунд\nПо причине : " + reason.join(" "))
        .setColor("ff0000")
        .setFooter("Ваш бот - Дружелюбная изба", client.user.avatarURL);
    const channel = message.guild.channels.get("490502418140889088");
    channel.send(embed);
};
