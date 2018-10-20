exports.run = (client, message) => {
	for(let i = 100; i < 156000;){
		i = i + i * 0.3
		message.channel.send(i)
	}
}
