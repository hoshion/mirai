exports.run = async (client, message, args) => {
	let b, c = 0;
	console.log(c);
	for(var i = 0; i < args.length; i++){
		await console.log(i)
		let a = await args[i].match(/"(.+?)"/);
		await console.log(a[1]);
		b.push(a[1])
	}
	//const map = await b.map(count => `${++c} - ${b[c++]}`).join(`\n`);
	//await message.channel.send(map);
	//await console.log(map)
	//message.channel.send(`${b.map(b => `${++c} - ${b}`).join(`\n`)}`);
}
