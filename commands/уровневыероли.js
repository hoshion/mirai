exports.run = (client, message, [second_command, rolem, xp]) => {
	const mysql = require(`mysql`);
	const con = mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME
	});
	if(!second_command) return message.channel.send(`**Доступные:** \`добавить\`,\`список\`,\`удалить\`.`)
	if(second_command.toLowerCase() == `добавить`){
		if(!rolem) return message.channel.send(`Вы не ввели роль`);
		if(!xp) return message.channel.send(`Вы не ввели количество очков`);
		const role = message.mentions.roles.first();
		console.log(role.id)
		con.query(`SELECT * FROM local WHERE serverid = '${message.guild.id}' AND roleid = '${role.id}' AND type = 'leveledrole'`, function(err, result){
			if(err) throw err;
			if(!result[0]){
				con.query(`INSERT INTO local (serverid, type, roleid, xpcount) VALUES('${message.guild.id}','leveledrole','${role.id}',${parseInt(xp)})`, function(err){
					if(err) throw err;
					message.channel.send(`Вы успешно установили ${xp} для роли @${role.name}`);
				})
			} else {
				message.channel.send(`У вас уже установлена эта роль!`)
			}
		})
	} 
	if(second_command.toLowerCase() == `удалить`){
		if(!rolem) return message.channel.send(`Вы не ввели роль`);
		const role = message.mentions.roles.first();
		con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND roleid = ${role.id} AND type = 'leveledrole'`, function(err, result){
			if(err) throw err;
			if(!result[0]){
				con.query(`DELETE FROM local WHERE userid = ${message.guild.id} AND type = leveledrole AND roleid = ${role.id}`, function(err){
					if(err) throw err;
					message.channel.send(`Роль успешно удалена из списка!`)
				})
			} else {
				message.channel.send(`Роли нету в списке.`)
			}
		})
	}
	if(second_command.toLowerCase() == `список`){
		con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND type = 'leveledrole'`, function(err, result){
			if(err) throw err;
			if(!result[0]) return message.channel.send(`Уровневых ролей нету`);
			let i = 0;
			message.channel.send(`${result.map(result => `**[${++i}]** \`${message.guild.roles.get(result.roleid).name}\` __(${result.xp})__`)}`)
		})
	}
}
exports.help = (client, message) => {
    message.channel.send(`**Информация о команде "уровневыероли"**\n\nПозволяет установить роль за xp.\nЧтобы установить роль, напишите \`-уровневыероли добавить @роль кол-во_очков\`\nЧтобы удалить роль, напишите \`-уровневыероли удалить @роль\`\nЧтобы увидеть список уровневых ролей, напишите \`-уровневыероли список\``)
}
