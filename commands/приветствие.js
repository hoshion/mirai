exports.run = (client, message, [command, ...welcome]) => {
    const mysql = require("mysql");
	const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
	try {
		con.query(`SELECT * FROM local WHERE serverid = '${message.guild.id}' AND type = 'welcome'`, function(err, result){
			if(err) return client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
			if(!command){
				if(!result[0]) return message.channel.send("**У вас не установлено приветствие!**\n\nЧтобы его установить напишите `-приветствие добавить [текст приветствия]`\nЧтобы установить канал для приветствия, напишите `-приветствие добавить #канал`\n\n*Примечание : Чтобы установить приветствие, нужно взять текст в \\` \\`*\n\nЧтобы увидеть это сообщение снова, напишите `-приветствие инфо`\nЧтобы узнать дополнительную информацию об установке приветствия, напишите `-приветствие доп`")
				message.channel.send(`Приветствие на этом сервере ー **${result[0].message}**`)
				return;
			}
			if(command.toLowerCase() == "добавить"){
				if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав!");
				if(!message.mentions.channels.first()){
					if(!result[0]){
						con.query(`INSERT INTO local (serverid,type,message) VALUES('${message.guild.id}','welcome','${welcome.join(" ")}')`, function(err){
							if(err) console.log(err);
							message.channel.send(`Вы установили приветствие!`)
						})
					} else {
						con.query(`UPDATE local SET message = '${welcome.join(" ")}' WHERE serverid = '${message.guild.id}' AND type = 'welcome'`, function(err){
							if(err) console.log(err);
							message.channel.send(`Вы установили приветствие!`)
						})
					}
					return
				}
				if(message.mentions.channels.first()){
					if(!result[0]){
						con.query(`INSERT INTO local (serverid,type,channelid) VALUES('${message.guild.id}','welcome','${message.mentions.channels.first().id}')`, function(err){
							if(err) console.log(err);
							message.channel.send(`Вы установили канал ${message.mentions.channels.first().id} для приветствия!`)
						})
					} else {
						con.query(`UPDATE local SET channelid = ${message.mentions.channels.first().id} WHERE serverid = '${message.guild.id}' AND type = 'welcome'`, function(err){
							if(err) console.log(err);
							message.channel.send(`Вы установили канал ${message.mentions.channels.first().id} для приветствия!`)
						})
					}
				}
			}
			if(command.toLowerCase() == "доп"){
				message.channel.send("**Основные плюшки:**\n**1.** Чтобы упомянуть человека в сообщении, вставьте *${member}*\n**2.** Чтобы упомянуть название гильдии, вставьте *${member.guild.name}*\n**3.** Чтобы вставить кол-во людей на сервере, вставьте *${member.guild.memberCount}*")
			}
			if(command.toLowerCase() == "инфо"){
				message.channel.send("Чтобы его установить напишите `-приветствие добавить [текст приветствия]`\nЧтобы установить канал для приветствия, напишите `-приветствие добавить #канал`\n\n*Примечание : Чтобы установить приветствие, нужно взять текст в \\` \\`*\n\nЧтобы увидеть это сообщение снова, напишите `-приветствие инфо`\nЧтобы узнать дополнительную информацию об установке приветствия, напишите `-приветствие доп`")
			}
		})
	} catch(err) {
		client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
	}
}
