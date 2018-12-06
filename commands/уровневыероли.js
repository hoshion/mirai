exports.run = (client, message, args) => {
	const mysql = require(`mysql`);
	const con = mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME
	});
	if(args[0].toLowerCase() == `добавить`){
		const role = message.mentions.roles;
		const xp   = args[2]
		if(!role) return message.channel.send(`Вы не ввели роль`);
		if(!xp)   return message.channel.send(`Вы не ввели количество очков`);
		
		con.query(INSERT INTO local (serverid, type, role, xpcount) VALUES('${message.guild.id}','leveledrole','${role.id}',${xp}), function(err){
			if(err) console.log(err);
		})
		message.channel.send(`Вы успешно установили ${xp} для роли @${role.name}`);
	}
}
