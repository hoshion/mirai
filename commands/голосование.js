exports.run = (client, message, args) => {
	let b;
	for(let i = 0; i < args.size; i++){
		let a = args[i].match(/(.+?)/);
		b.push(a[1]);
	}
	message.channel.send(`${b[0]} ${b[1]} ${b[2]}`);
}
