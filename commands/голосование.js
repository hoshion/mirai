exports.run = (client, message) => {
	const args = message.content.slice(prefix.length).trim().split(/" +"/g);
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
}
