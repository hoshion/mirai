exports.run = (client, message) => {
	const args = message.content.slice(14,1).trim().split(`" "`);
	message.channel.send(`${args[0]} ${args[1]}`)
}
