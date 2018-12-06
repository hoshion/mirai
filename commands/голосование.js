exports.run = (client, message, args) => {
	let b;
	let c = 0
	for(let i = 0; i < args.size; i++){
		let a = args[i].match(/"(.+?)"/);
		b[i] = a[1];
	}
	message.channel.send(`${b.map(b => `${++c} - ${b}`).join(`\n`)}`);
}
