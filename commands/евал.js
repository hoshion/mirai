exports.run = (client, message) => {
	if(message.author.id != process.env.OWNER_ID) return;
	const args = message.content.split(" ").slice(1);
	const mysql = require(`mysql`);
	const Discord = require(`discord.js`)
	const con = mysql.createConnection({
	    host: process.env.DATABASE_HOST,
	    user: process.env.DATABASE_USER,
	    password: process.env.DATABASE_PASSWORD,
	    database: process.env.DATABASE_NAME
	});
	
	try {
		const code = args.join(` `);
		let evaled = eval(code)
		
		if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);
		const word = code.match(/messsage\.channel\.send\(.+\)/g)
		if(!word) return message.react(`✅`);
		else message.channel.send(clean(evaled), {code:`xl`});
	} catch(err) {
		client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``))
		message.react(`❌`);
	}
}
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
