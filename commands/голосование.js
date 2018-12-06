exports.run = async (client, message, args) => {
	let i, b, c = 0;
	await for(i = 0; i < args.size; i++){
		console.log(i)
		let a = args[i].match(/"(.+?)"/);
		console.log(a[1]);
		b[i] = a[1]
	}
	//const map = await b.map(count => `${++c} - ${b[c++]}`).join(`\n`);
	//await message.channel.send(map);
	//await console.log(map)
	//message.channel.send(`${b.map(b => `${++c} - ${b}`).join(`\n`)}`);
}
