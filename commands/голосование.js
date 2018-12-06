exports.run = (client, message, args) => {
	let i;
	let c = 0;
	for(i = 0; i < args.size; i++){
		console.log(i)
		let a = args[i].match(/"(.+?)"/);
		console.log(a[1]);
		b[i] = a[1]
	}
	const map = b.map(count => `${++c} - ${b[c++]}`).join(`\n`);
	message.channel.send(map);
	console.log(map)
	//message.channel.send(`${b.map(b => `${++c} - ${b}`).join(`\n`)}`);
}
