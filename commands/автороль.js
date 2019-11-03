exports.run = (client, message, args) => {
  const mysql = require("mysql");
  const con = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
  });
	try{
		con.query(`SELECT * FROM local WHERE serverid = '${message.guild.id}' AND type = 'autorole'`,function (err,result){
			if(!args[0]){
				if(!result[0]) return message.channel.send("**У вас нету установленной автороли!**\n\nЧтобы установить автороль, напишите `-автороль добавить @роль`")
				message.channel.send(`Установленная автороль на сервере ー **${message.guild.roles.get(result[0].roleid).name}**`)
				return
			}
			if(args[0].toLowerCase() == "добавить"){
				if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");
				if(!result[0]){
					con.query(`INSERT INTO local (serverid,type,roleid) VALUES('${message.guild.id}','autorole','${message.mentions.roles.first().id}')`, function(err){
						if(err) console.log(err);
						if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");
						message.channel.send(`Вы установили роль **${message.mentions.roles.first().name}** по умолчанию`)
					})
				} else {
					con.query(`UPDATE local SET roleid = ${message.mentions.roles.first().id} WHERE serverid = '${message.guild.id}' AND type = 'autorole'`, function(err){
						if(err) console.log(err);
						message.channel.send(`Вы установили роль **${message.mentions.roles.first().name}** по умолчанию`)
					})
				}
			}
		})
	} catch(err) {
		client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
	}
}
exports.help = (client, message) => {
    message.channel.send(`**Информация о команде "автороль"**\n\nПозволяет установить роль, которая будет выдаваться во время захода на сервер.\nЧтобы установить роль, напишите \`-автороль добавить @роль\``)
}
