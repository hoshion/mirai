exports.run = (client, message, args) => {
	let i
	for(i = 0; i < args.size; i++){
		let a = args[i].match(/"(.+?)"/);
		message.channel.send(a[1]);
	}
	//message.channel.send(`${b.map(b => `${++c} - ${b}`).join(`\n`)}`);
}
