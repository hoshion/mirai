exports.run = (client, message, [command, ...welcome]) => {
    const mysql = require("mysql");
	const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
	
	con.query(`SELECT * FROM local WHERE serverid = '${message.guild.id}' AND type = 'welcome'`, function(err, result){
		if(!args[0]){
			if(!result[0]) return message.channel.send("**У вас не установлено приветствие!**\n\nЧтобы его установить напишите `-приветствие добавить [текст приветствия]\nЧтобы установить канал для приветствия, напишите `-приветствие добавить #канал`")
			message.channel.send(`Приветствие на этом сервере ー **${result[0].message}**`)
			return;
		}
		if(args[0].toLowerCase() == "добавить"){
			if(!message.mentions.channels.first()){
				if(!result[0].message){
					con.query(`INSERT INTO local (serverid,type,message) VALUES('${message.guild.id}','welcome','${args.join(" ")}')`, function(err){
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
			if(!welcome){
				if(!result[0].channelid){
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
	})
}
