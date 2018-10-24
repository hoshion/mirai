exports.run = (client, message) => {
	const mysql = require("mysql")
	const con = mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME
	});
	
	con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND type = member ORDER BY local.xp DESC`, function(err, result){
		con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND userid = ${message.author.id}`, function(err, result2){
			message.channel.send("Проверка"); 
		});
	});
};
