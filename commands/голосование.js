exports.run = async (client, message, args) => {
	let c = 0;
	var b = [];
	for(var i = 0; i < args.length; i++){
		let a = await args[i].match(/"(.+?)"/);
		b.push(a[1])
	}
	console.log(b);
	const map = b.map(count => `${++c} - ${b[count]}`).join(`\n`);
	message.channel.send(map);
	console.log(map)
	//message.channel.send(`${b.map(b => `${++c} - ${b}`).join(`\n`)}`);
}
