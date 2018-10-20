exports.run = (client, message) => {
	let st;
	for(let st = 100; st < 156000; st = st + st * 0,3){
		message.channel.send(st);
	}
}
