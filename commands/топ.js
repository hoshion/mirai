exports.run = (client, message) => {
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "db4free.net",
        user: "botdrizba",
        password: "drizba123",
        database: "drizba"
    });

	con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND type = 'member' ORDER by local.xp DESC`, function(err, result){
		try{
			if(err) return client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
			let placeNumber = [];
			let userName = [];
			for(let i = 0; i < result.length ; i++){
				con.query(`SELECT * FROM global WHERE userid = ${result[i].userid}`, function(err, result){
					if(err) return client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
					userName[i] = result[0].nickname;
				});
				if(result[i].userid == message.author.id) {
				placeNumber[i] = result[i].userid;
				}
			}
			const ownPlace = placeNumber.indexOf(message.author.id) + 1;
			let count = 0;
			let top = result;
			if(result.length > 10) top = result.slice(0,10);
			let text = top.map(t =>`${++count}. ${userName[count]}\n>\tXP - ${t.xp}`).join(`\n`)
			message.channel.send(`**\`\`\`md\n Список людей по кол-ву очков\n\n${text}\n\n Ваше место - ${ownPlace}\`\`\`**`);
		} catch(err) {
			client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
		}
    });
};
