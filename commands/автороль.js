exports.run = (client, message, args) => {
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "db4free.net",
        user: "botdrizba",
        password: "drizba123",
        database: "drizba"
    });
	con.query(`SELECT * FROM local WHERE serverid = '${message.guild.id}' AND type = 'autorole'`,function (err,result){
		if(!args[0]){
			if(!result[0]) return message.channel.send("**У вас нету установленной автороли!**\n\nЧтобы установить автороль, напишите `-автороль добавить @роль`")
			message.channel,send(`Установленная автороль на сервере ー **${message.guild.roles.get(result[0].roleid).name}**`)
		}
		if(args[0].toLowerCase() == "добавить"){
			if(!result[0]){
				con.query(`INSERT INTO local (serverid,type,roleid) VALUES('${message.guild.id}','autorole','${message.mentions.roles.first().id}')`, function(err){
					if(err) console.log(err);
				})
			} else {
				con.query(`UPDATE local SET roleid = ${message.mentions.roles.first().id} WHERE serverid = '${message.guild.id}' AND type = 'autorole'`, function(err){
					if(err) console.log(err);
				})
			}
		}
	})
}
