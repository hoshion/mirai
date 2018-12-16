exports.run = (client, message) => {
	try { 
	const args = message.content.slice(13).split(/" +"/g);
	let c = 0;
	var b = [];
	for(var i = 0; i < args.length; i++){
		let a = args[i].match(/"(.+?)"/);
		b.push(a[1])
	}
	console.log(b);
	const map = b.map(count => `${++c} - ${count}`).join(`\n`);
	message.channel.send(map);
	console.log(map)
	//message.channel.send(`${b.map(b => `${++c} - ${b}`).join(`\n`)}`);
	} catch(err) {
		client.fetchUser('412338841651904516').then(user => user.send(`\`\`\`javascript\n${err.stack}\`\`\``));
	}
}
