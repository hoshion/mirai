exports.run = (client, message) => {
	if(message.author.id !== `412338841651904516`) return;
	const args = message.content.split(" ").slice(1);
	
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
