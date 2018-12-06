exports.run = (client, message, args) => {
	const mysql = require(`mysql`);
	const con = mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME
	});
	if(!args[0]) return message.channel.send(`**Доступные:** \`добавить\`,\`список\`,\`удалить\`.`)
	if(args[0].toLowerCase() == `добавить`){
		const role = message.mentions.roles;
		const xp   = args[2]
		if(!role) return message.channel.send(`Вы не ввели роль`);
		if(!xp)   return message.channel.send(`Вы не ввели количество очков`);
		con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND roleid = ${role.id} AND type = 'leveledrole'`, function(err, result){
			if(err) throw err;
			if(!result[0]){
				con.query(`INSERT INTO local (serverid, type, roleid, xpcount) VALUES('${message.guild.id}','leveledrole','${role.id}',${xp})`, function(err){
					if(err) throw err;
					message.channel.send(`Вы успешно установили ${xp} для роли @${role.name}`);
				})
			} else {
				message.channel.send(`У вас уже установлена эта роль!`)
			}
		})
	} 
	if(args[0].toLowerCase == `удалить`){
		const role = message.mentions.roles;
		if(!role) return message.channel.send(`Вы не ввели роль`);
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
	if(args[0].toLowerCase == `список`){
		con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND type = 'leveledrole'`, function(err, result){
			if(err) throw err;
			if(!result) return message.channel.send(`Уровневых ролей нету`)
			let i = 0;
			message.channel.send(`${result.map(result => `**[${++i}]** \`${message.guild.roles.get(result.roleid).name}\` __(${result.xp})__`)}`)
		})
	}
}
exports.help = (client, message) => {
    message.channel.send(`
**Информация о команде "уровневыероли"**
\n\nПозволяет установить роль за xp.
\nЧтобы установить роль, напишите \`-уровневыероли добавить @роль кол-во_очков\`
\nЧтобы удалить роль, напишите \`-уровневыероли удалить @роль\`
\nЧтобы увидеть список уровневых ролей, напишите \`-уровневыероли список\`
`}
