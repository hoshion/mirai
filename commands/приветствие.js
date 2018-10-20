exports.run = (client, message, args) => {
	const Jimp = require("jimp");
    const mysql = require("mysql");
	const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
	
	con.query(`SELECT * FROM local WHERE serverid = '${message.guild.id}' AND type = 'welcome'`, function(err, result){
		if(!args[0]){
			if(!result[0]) return message.channel.send("**У вас не установлено приветствие!**\n\nЧтобы его установить напишите `-приветствие установить [текст приветствия]`")
			message.channel.send(``)
		}
	})
}
