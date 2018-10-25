exports.run = (client, message, [mention, ...reason]) => {
    const Discord = require("discord.js");
    var member = message.mentions.members.first();
    const mysql = require("mysql")
    
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    if(!member) return message.channel.send("Вы не указали человека!");
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Недостаточно прав!");
    
    member.ban(reason.join(" "))
    .then(() => message.channel.send("Вы забанили **" + member.user.tag + "** по причине - **" + reason + "** !"))
    .catch(() => message.channel.send("Чота у него дофига прав."));
	con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND type = 'logs'`, function(err, result){
		if(err) console.log(err);
		if(!result[0]) return;
		const channel = message.guild.channels.get("497837552636788737");
		const embed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.avatarURL)
		.setDescription(`Забанил человека ${member.user.username}\nПо причине : ${reason.join(" ")}`)
		.setColor(`ff0000`)
		.setFooter(`Ваш бот - ${client.user.username}`, client.user.avatarURL);
		channel.send(embed);
	})
}
